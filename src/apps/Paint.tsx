import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Brush, Eraser, PaintBucket, Wind, Minus, Square, Circle, RotateCcw, FilePlus, Download } from 'lucide-react';

// Classic 28 MS Paint Colors
const PAINT_COLORS = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080ff', '#004080', '#4000ff', '#804000',
  '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffff80', '#00ff80', '#80ffff', '#8080ff', '#ff8000', '#ff8080'
];

type Tool = 'pencil' | 'brush' | 'eraser' | 'fill' | 'spray' | 'line' | 'rect' | 'ellipse' | 'picker';

export const Paint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [tool, setTool] = useState<Tool>('pencil');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  
  const [brushSize, setBrushSize] = useState(5);
  const [eraserSize, setEraserSize] = useState(16);
  const [sprayRadius, setSprayRadius] = useState(12);
  const [shapeFilled, setShapeFilled] = useState(false);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  
  // Undo/Redo stack (stores ImageData snapshots of canvas)
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 });
  
  // For the spray can interval
  const sprayIntervalRef = useRef<number | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  // Store canvas snapshot during shape dragging
  const dragSnapshotRef = useRef<ImageData | null>(null);

  // Initialize canvas with white background and store initial state
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Save initial state
        const initialSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setUndoStack([initialSnapshot]);
      }
    }
  }, [canvasSize]);

  // Handle saving undo state
  const saveUndoState = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setUndoStack(prev => [...prev.slice(-29), snapshot]); // keep last 30 states
      }
    }
  };

  const handleUndo = () => {
    if (undoStack.length <= 1) return; // keep at least initial state
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        const nextStack = [...undoStack];
        nextStack.pop(); // remove current state
        const prevState = nextStack[nextStack.length - 1];
        setUndoStack(nextStack);
        ctx.putImageData(prevState, 0, 0);
      }
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveUndoState();
      }
    }
  };

  // Get canvas local mouse coordinates
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement>): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Calculate scale in case canvas display size differs from coordinate size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: Math.round((e.clientX - rect.left) * scaleX),
      y: Math.round((e.clientY - rect.top) * scaleY)
    };
  };

  // Flood Fill Algorithm
  const performFloodFill = (startX: number, startY: number, fillHex: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // Convert hex to RGBA
    const parseHex = (hex: string) => {
      const num = parseInt(hex.replace('#', ''), 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
        a: 255
      };
    };

    const targetColor = parseHex(fillHex);
    const startIdx = (startY * width + startX) * 4;
    const startColor = {
      r: data[startIdx],
      g: data[startIdx + 1],
      b: data[startIdx + 2],
      a: data[startIdx + 3]
    };

    // If target and start color are identical, do nothing
    if (
      Math.abs(startColor.r - targetColor.r) < 5 &&
      Math.abs(startColor.g - targetColor.g) < 5 &&
      Math.abs(startColor.b - targetColor.b) < 5 &&
      Math.abs(startColor.a - targetColor.a) < 5
    ) {
      return;
    }

    const queue: [number, number][] = [[startX, startY]];
    const visited = new Uint8Array(width * height);
    visited[startY * width + startX] = 1;

    while (queue.length > 0) {
      const [currX, currY] = queue.shift()!;
      const idx = (currY * width + currX) * 4;

      data[idx] = targetColor.r;
      data[idx + 1] = targetColor.g;
      data[idx + 2] = targetColor.b;
      data[idx + 3] = targetColor.a;

      const neighbors = [
        [currX + 1, currY],
        [currX - 1, currY],
        [currX, currY + 1],
        [currX, currY - 1]
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIdx = ny * width + nx;
          if (!visited[nIdx]) {
            const pixelIdx = nIdx * 4;
            // Match color with tolerance to handle smooth borders/anti-aliasing slightly
            const match =
              Math.abs(data[pixelIdx] - startColor.r) < 18 &&
              Math.abs(data[pixelIdx + 1] - startColor.g) < 18 &&
              Math.abs(data[pixelIdx + 2] - startColor.b) < 18 &&
              Math.abs(data[pixelIdx + 3] - startColor.a) < 18;

            if (match) {
              visited[nIdx] = 1;
              queue.push([nx, ny]);
            }
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    saveUndoState();
  };

  // Color Picker
  const pickColorAt = (x: number, y: number, isRightClick: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hexColor = '#' + [pixel[0], pixel[1], pixel[2]]
      .map(v => v.toString(16).padStart(2, '0'))
      .join('');
    
    if (isRightClick) {
      setBgColor(hexColor);
    } else {
      setFgColor(hexColor);
    }
  };

  // Spray effect helper
  const drawSpray = (ctx: CanvasRenderingContext2D, center: { x: number; y: number }, color: string) => {
    ctx.fillStyle = color;
    // Spray 10 dots inside the radius
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * sprayRadius;
      const dx = Math.cos(angle) * r;
      const dy = Math.sin(angle) * r;
      
      // Draw tiny 1px pixels
      ctx.fillRect(Math.round(center.x + dx), Math.round(center.y + dy), 1, 1);
    }
  };

  // Mouse Down
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const isRightClick = e.button === 2;
    const color = isRightClick ? bgColor : fgColor;
    const pos = getCoordinates(e);

    setIsDrawing(true);
    setStartPos(pos);
    mousePosRef.current = pos;

    if (tool === 'picker') {
      pickColorAt(pos.x, pos.y, isRightClick);
      setIsDrawing(false);
      setTool('pencil');
      return;
    }

    if (tool === 'fill') {
      performFloodFill(pos.x, pos.y, color);
      setIsDrawing(false);
      return;
    }

    // Save snapshot for shape previews or line drawing
    dragSnapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (tool === 'pencil') {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (tool === 'brush') {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(pos.x - eraserSize / 2, pos.y - eraserSize / 2, eraserSize, eraserSize);
    } else if (tool === 'spray') {
      drawSpray(ctx, pos, color);
      // Continuous spray on hover-still
      sprayIntervalRef.current = window.setInterval(() => {
        drawSpray(ctx, mousePosRef.current, color);
      }, 25);
    }
  };

  // Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isRightClick = e.buttons === 2;
    const color = isRightClick ? bgColor : fgColor;
    const pos = getCoordinates(e);
    mousePosRef.current = pos;

    if (tool === 'pencil') {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (tool === 'brush') {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(pos.x - eraserSize / 2, pos.y - eraserSize / 2, eraserSize, eraserSize);
    } else if (['line', 'rect', 'ellipse'].includes(tool)) {
      // Restore snapshot to draw interactive preview
      if (dragSnapshotRef.current) {
        ctx.putImageData(dragSnapshotRef.current, 0, 0);
      }

      ctx.strokeStyle = color;
      ctx.fillStyle = shapeFilled ? color : 'transparent';
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (tool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      } else if (tool === 'rect') {
        ctx.beginPath();
        const rx = startPos.x;
        const ry = startPos.y;
        const rw = pos.x - startPos.x;
        const rh = pos.y - startPos.y;
        if (shapeFilled) {
          ctx.fillRect(rx, ry, rw, rh);
        }
        ctx.rect(rx, ry, rw, rh);
        ctx.stroke();
      } else if (tool === 'ellipse') {
        ctx.beginPath();
        const rx = Math.abs(pos.x - startPos.x) / 2;
        const ry = Math.abs(pos.y - startPos.y) / 2;
        const cx = startPos.x + (pos.x - startPos.x) / 2;
        const cy = startPos.y + (pos.y - startPos.y) / 2;
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        if (shapeFilled) {
          ctx.fill();
        }
        ctx.stroke();
      }
    }
  };

  // Mouse Up
  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    // Clear spray interval
    if (sprayIntervalRef.current !== null) {
      clearInterval(sprayIntervalRef.current);
      sprayIntervalRef.current = null;
    }

    saveUndoState();
    dragSnapshotRef.current = null;
  };

  // Clean spray interval on unmount
  useEffect(() => {
    return () => {
      if (sprayIntervalRef.current !== null) {
        clearInterval(sprayIntervalRef.current);
      }
    };
  }, []);

  // Save / Export canvas as image
  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'paint-drawing.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // Render Left Tool Box Item
  const renderToolButton = (id: Tool, icon: React.ReactNode, title: string) => {
    const isSelected = tool === id;
    return (
      <button
        onClick={() => setTool(id)}
        title={title}
        className={`w-[25px] h-[25px] flex items-center justify-center select-none outline-none ${
          isSelected
            ? 'bg-white border-t-gray-600 border-l-gray-600 border-b-white border-r-white border shadow-[inset_1px_1px_1px_rgba(0,0,0,0.15)]'
            : 'bg-[#ECE9D8] border-t-white border-l-white border-b-gray-600 border-r-gray-600 border active:border-t-gray-600 active:border-l-gray-600 active:border-b-white active:border-r-white'
        }`}
      >
        <span className="text-[#333]">{icon}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#ECE9D8] select-none font-sans text-xs text-black border-2 border-white rounded shadow-md overflow-hidden" ref={containerRef}>
      
      {/* Top Menu Bar */}
      <div className="flex gap-4 px-2 py-1 bg-[#ECE9D8] text-xs border-b border-[#D5D5D5] select-none">
        <button 
          onClick={handleSave} 
          className="hover:bg-blue-500 hover:text-white px-1.5 py-[1px] cursor-pointer rounded flex items-center gap-1 font-medium bg-transparent border-none text-black"
        >
          <Download size={11} /> Save
        </button>
        <button 
          onClick={handleClear} 
          className="hover:bg-blue-500 hover:text-white px-1.5 py-[1px] cursor-pointer rounded flex items-center gap-1 font-medium bg-transparent border-none text-black"
        >
          <FilePlus size={11} /> New
        </button>
        <button 
          onClick={handleUndo} 
          disabled={undoStack.length <= 1}
          className="hover:bg-blue-500 hover:text-white px-1.5 py-[1px] cursor-pointer rounded flex items-center gap-1 font-medium disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-black bg-transparent border-none text-black"
        >
          <RotateCcw size={11} /> Undo
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Toolbar Column */}
        <div className="w-[45px] bg-[#ECE9D8] border-r border-[#B5B5B5] p-1 flex flex-col gap-1 items-center">
          <div className="grid grid-cols-2 gap-[2px]">
            {renderToolButton('pencil', <Pencil size={13} />, 'Pencil')}
            {renderToolButton('brush', <Brush size={13} />, 'Brush')}
            {renderToolButton('eraser', <Eraser size={13} />, 'Eraser')}
            {renderToolButton('fill', <PaintBucket size={13} />, 'Flood Fill')}
            {renderToolButton('spray', <Wind size={13} />, 'Airbrush (Spray Can)')}
            {renderToolButton('line', <Minus size={13} className="rotate-45" />, 'Line')}
            {renderToolButton('rect', <Square size={12} />, 'Rectangle')}
            {renderToolButton('ellipse', <Circle size={12} />, 'Ellipse')}
          </div>

          {/* Tool Options Box (dynamic depending on selected tool) */}
          <div className="w-full mt-4 border border-[#808080] bg-[#ECE9D8] rounded-[2px] p-1.5 flex flex-col items-center justify-center min-h-[64px] shadow-[inset_1px_1px_1px_rgba(0,0,0,0.1)]">
            
            {/* Pencil/Brush/Shapes size controls */}
            {(tool === 'brush' || tool === 'line' || tool === 'rect' || tool === 'ellipse') && (
              <div className="flex flex-col gap-1 w-full">
                <span className="text-[9px] text-center font-bold text-gray-600 leading-none">SIZE</span>
                {[2, 5, 8, 12, 18].map((size) => (
                  <button
                    key={size}
                    onClick={() => setBrushSize(size)}
                    className={`w-full h-4 relative flex items-center justify-center hover:bg-black/5 rounded ${
                      brushSize === size ? 'bg-black/10' : ''
                    }`}
                  >
                    <div 
                      className="bg-black rounded-full" 
                      style={{ width: `${size}px`, height: `${size}px` }} 
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Eraser size controls */}
            {tool === 'eraser' && (
              <div className="flex flex-col gap-1 w-full">
                <span className="text-[9px] text-center font-bold text-gray-600 leading-none">ERASER</span>
                {[8, 16, 24, 32].map((size) => (
                  <button
                    key={size}
                    onClick={() => setEraserSize(size)}
                    className={`w-full h-5 relative flex items-center justify-center hover:bg-black/5 rounded ${
                      eraserSize === size ? 'bg-black/10' : ''
                    }`}
                  >
                    <div 
                      className="border border-black bg-white" 
                      style={{ width: `${size/2}px`, height: `${size/2}px` }} 
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Spray size controls */}
            {tool === 'spray' && (
              <div className="flex flex-col gap-1 w-full">
                <span className="text-[9px] text-center font-bold text-gray-600 leading-none">SPRAY</span>
                {[8, 12, 18, 25].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSprayRadius(size)}
                    className={`w-full h-4 text-[10px] text-center hover:bg-black/5 rounded ${
                      sprayRadius === size ? 'bg-black/10 font-bold' : ''
                    }`}
                  >
                    {size}px
                  </button>
                ))}
              </div>
            )}

            {/* Rectangle / Ellipse Filled vs Border Option */}
            {(tool === 'rect' || tool === 'ellipse') && (
              <div className="mt-2 pt-2 border-t border-gray-400 w-full flex flex-col gap-1">
                <button
                  onClick={() => setShapeFilled(false)}
                  className={`w-full py-0.5 border text-[9px] font-bold ${
                    !shapeFilled ? 'bg-white border-[#808080]' : 'border-transparent'
                  }`}
                >
                  Outline
                </button>
                <button
                  onClick={() => setShapeFilled(true)}
                  className={`w-full py-0.5 border text-[9px] font-bold ${
                    shapeFilled ? 'bg-white border-[#808080]' : 'border-transparent'
                  }`}
                >
                  Filled
                </button>
              </div>
            )}

            {tool === 'pencil' && (
              <span className="text-[10px] text-center text-gray-500 italic leading-snug">
                1px pencil
              </span>
            )}

            {tool === 'fill' && (
              <span className="text-[10px] text-center text-gray-500 italic leading-snug">
                Flood Fill
              </span>
            )}
          </div>
        </div>

        {/* Center Drawing Workspace Area */}
        <div className="flex-1 bg-[#808080] p-4 overflow-auto flex items-center justify-center min-h-[300px] relative">
          
          {/* Canvas Inset shadow container */}
          <div className="relative border-t-2 border-l-2 border-b-white border-r-white border bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
            <canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onContextMenu={(e) => e.preventDefault()}
              className="block bg-white cursor-crosshair"
              style={{
                width: `${canvasSize.width}px`,
                height: `${canvasSize.height}px`,
              }}
            />
            
            {/* Resizing handles for canvas bottom/right (mimicking MS Paint) */}
            <div 
              className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-black border border-white cursor-ew-resize z-10"
              onMouseDown={(e) => {
                e.preventDefault();
                const startX = e.clientX;
                const startWidth = canvasSize.width;
                const onMouseMoveWidth = (moveEvent: MouseEvent) => {
                  setCanvasSize(prev => ({
                    ...prev,
                    width: Math.max(200, startWidth + (moveEvent.clientX - startX))
                  }));
                };
                const onMouseUpWidth = () => {
                  window.removeEventListener('mousemove', onMouseMoveWidth);
                  window.removeEventListener('mouseup', onMouseUpWidth);
                };
                window.addEventListener('mousemove', onMouseMoveWidth);
                window.addEventListener('mouseup', onMouseUpWidth);
              }}
            />
            <div 
              className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-black border border-white cursor-ns-resize z-10"
              onMouseDown={(e) => {
                e.preventDefault();
                const startY = e.clientY;
                const startHeight = canvasSize.height;
                const onMouseMoveHeight = (moveEvent: MouseEvent) => {
                  setCanvasSize(prev => ({
                    ...prev,
                    height: Math.max(150, startHeight + (moveEvent.clientY - startY))
                  }));
                };
                const onMouseUpHeight = () => {
                  window.removeEventListener('mousemove', onMouseMoveHeight);
                  window.removeEventListener('mouseup', onMouseUpHeight);
                };
                window.addEventListener('mousemove', onMouseMoveHeight);
                window.addEventListener('mouseup', onMouseUpHeight);
              }}
            />
            <div 
              className="absolute right-[-4px] bottom-[-4px] w-[6px] h-[6px] bg-black border border-white cursor-nwse-resize z-10"
              onMouseDown={(e) => {
                e.preventDefault();
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = canvasSize.width;
                const startHeight = canvasSize.height;
                const onMouseMoveBoth = (moveEvent: MouseEvent) => {
                  setCanvasSize({
                    width: Math.max(200, startWidth + (moveEvent.clientX - startX)),
                    height: Math.max(150, startHeight + (moveEvent.clientY - startY))
                  });
                };
                const onMouseUpBoth = () => {
                  window.removeEventListener('mousemove', onMouseMoveBoth);
                  window.removeEventListener('mouseup', onMouseUpBoth);
                };
                window.addEventListener('mousemove', onMouseMoveBoth);
                window.addEventListener('mouseup', onMouseUpBoth);
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Color Palette */}
      <div className="h-[46px] bg-[#ECE9D8] border-t border-[#B5B5B5] p-1 flex gap-3 items-center select-none" onContextMenu={(e) => e.preventDefault()}>
        
        {/* Active color preview boxes */}
        <div className="relative w-[32px] h-[32px] bg-[#ECE9D8] border border-gray-400 flex-shrink-0">
          {/* Background color (right click) */}
          <div 
            className="absolute bottom-1 right-1 w-[16px] h-[16px] border border-[#808080] shadow-[inset_1px_1px_rgba(0,0,0,0.1)]"
            style={{ backgroundColor: bgColor }}
            title="Background color (Right click palette to select)"
          />
          {/* Foreground color (left click) */}
          <div 
            className="absolute top-1 left-1 w-[16px] h-[16px] border border-[#808080] shadow-[1px_1px_2px_rgba(0,0,0,0.2)]"
            style={{ backgroundColor: fgColor }}
            title="Foreground color (Left click palette to select)"
          />
        </div>

        {/* 28-color Grid */}
        <div className="flex-1 grid grid-flow-col grid-rows-2 gap-[2px] overflow-hidden max-w-[400px]">
          {PAINT_COLORS.map((colorStr) => (
            <button
              key={colorStr}
              onClick={() => setFgColor(colorStr)}
              onContextMenu={(e) => {
                e.preventDefault();
                setBgColor(colorStr);
              }}
              className="w-[13px] h-[13px] border border-gray-400 hover:scale-105 active:scale-95 outline-none transition-transform"
              style={{ backgroundColor: colorStr }}
              title={`Left-click: FG, Right-click: BG (${colorStr})`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
