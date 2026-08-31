import React, { useEffect, useState } from 'react';
import { Power } from 'lucide-react';
import { useStore } from '../store';
import { useMobile } from '../hooks/useMobile';
import xpLogo from '../assets/xp-logo-new.png';
import xpFlag from '../assets/xp-logo.png';

export const BootScreen: React.FC = () => {
  const { systemState, setSystemState, setCurrentUser } = useStore();
  const [loggingInUser, setLoggingInUser] = useState<'Sai Krishnan' | null>(null);
  const isMobile = useMobile();

  useEffect(() => {
    if (systemState === 'booting') {
      setLoggingInUser(null);
      const t = setTimeout(() => setSystemState('welcome'), 3000);
      return () => clearTimeout(t);
    }
  }, [systemState, setSystemState]);

  useEffect(() => {
    if (systemState === 'shutting_down') {
      const t = setTimeout(() => setSystemState('off'), 2000);
      return () => clearTimeout(t);
    }
  }, [systemState, setSystemState]);

  const handleProfileSelect = (user: 'Sai Krishnan') => {
    if (loggingInUser) return;
    setLoggingInUser(user);
    setTimeout(() => {
      setCurrentUser(user);
      setSystemState('running');
    }, 1500);
  };

  // ─── OFF ───────────────────────────────────────────────────────────────────
  if (systemState === 'off') {
    return (
      <div className="fixed inset-0 bg-[#0d0d0d] flex flex-col items-center justify-center z-[9999] font-sans text-white select-none">
        <button
          onClick={() => setSystemState('booting')}
          className="w-16 h-16 rounded-full border-4 border-gray-600 bg-black flex items-center justify-center text-green-500 hover:text-green-400 cursor-pointer shadow-lg hover:border-gray-500 transition-all group"
        >
          <Power className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </button>
        <span className="mt-4 text-gray-500 text-xs font-mono tracking-wider animate-pulse">
          Click button to power on system
        </span>
      </div>
    );
  }

  // ─── BOOTING ───────────────────────────────────────────────────────────────
  if (systemState === 'booting') {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-between select-none text-white overflow-hidden font-sans">
        <div className={isMobile ? 'w-full h-12' : 'w-full h-24'} />
        <div className={`flex flex-col items-center relative w-full max-w-[600px] px-4 ${isMobile ? 'mt-6' : 'mt-12'}`}>
          <div className={`relative flex justify-center w-full ${isMobile ? 'mb-6 ml-0' : 'mb-10 ml-12'}`}>
            <img src={xpLogo} alt="Windows Logo" className={`object-contain ${isMobile ? 'w-[110px]' : 'w-[200px]'}`} />
          </div>
          <div className="relative flex flex-col items-center">
            <div className={`absolute left-1 tracking-wide text-white ${isMobile ? '-top-4 text-[13px]' : '-top-7 text-[22px]'}`}>
              Microsoft<sup className="text-[10px] ml-[1px]">®</sup>
            </div>
            <div className="flex items-end">
              <span className={`font-bold tracking-[-2px] leading-none text-white ${isMobile ? 'text-[40px]' : 'text-[75px]'}`}>Windows</span>
              <span className={`text-[#ff6600] font-bold italic tracking-tighter ${isMobile ? 'text-[26px] ml-1 mb-2' : 'text-[48px] ml-2 mb-4'}`}>xp</span>
            </div>
          </div>
          <div className={`w-[160px] h-[16px] border-[2px] border-gray-500 rounded-[5px] p-[1px] relative overflow-hidden bg-black ${isMobile ? 'mt-14' : 'mt-28'}`}>
            <div className="absolute top-[1px] bottom-[1px] w-[30px] flex justify-between animate-[moveRight_2s_linear_infinite]">
              <div className="w-[8px] h-full bg-gradient-to-b from-[#11388b] via-[#4887ff] to-[#11388b] rounded-[1px]" />
              <div className="w-[8px] h-full bg-gradient-to-b from-[#11388b] via-[#4887ff] to-[#11388b] rounded-[1px]" />
              <div className="w-[8px] h-full bg-gradient-to-b from-[#11388b] via-[#4887ff] to-[#11388b] rounded-[1px]" />
            </div>
          </div>
        </div>
        {isMobile ? (
          <div className="w-full flex flex-col items-center gap-1 pb-8 mt-auto">
            <div className="text-white text-base font-bold italic tracking-tight">Microsoft</div>
            <div className="text-gray-400 text-[11px]">Copyright © Microsoft Corporation</div>
          </div>
        ) : (
          <div className="w-full flex justify-between items-end px-12 pb-12 mt-auto">
            <div className="text-gray-400 text-[15px]">Copyright © Microsoft Corporation</div>
            <div className="text-white text-2xl font-bold italic tracking-tight">Microsoft</div>
          </div>
        )}
        <style>{`@keyframes moveRight { 0% { left: -40px; } 100% { left: 160px; } }`}</style>
      </div>
    );
  }

  // ─── SHUTTING DOWN ─────────────────────────────────────────────────────────
  if (systemState === 'shutting_down') {
    const barHeight = isMobile ? 48 : 72;
    return (
      <div className="fixed inset-0 bg-[#4a7cd0] z-[9999] flex flex-col justify-between select-none overflow-hidden font-sans">
        <div style={{ height: barHeight, background: 'linear-gradient(180deg,#1a3c8e,#183688)', flexShrink: 0 }} />
        <div className="flex-1 flex flex-col items-center justify-center relative px-6">
          <div className="absolute top-0 left-[-20%] w-[60%] h-full bg-gradient-to-r from-white/25 to-transparent blur-3xl pointer-events-none" />
          <div className={`flex items-center ${isMobile ? 'flex-col text-center gap-3' : 'gap-8'}`}>
            <div className={`bg-red-600 rounded-[4px] flex items-center justify-center shadow-lg ${isMobile ? 'w-12 h-12 text-2xl' : 'w-[68px] h-[68px] text-4xl'}`}>📴</div>
            <div className="flex flex-col">
              <span className={`text-white leading-tight font-semibold drop-shadow ${isMobile ? 'text-[18px]' : 'text-[28px]'}`}>Saving your settings...</span>
              <span className={`text-blue-900 font-bold mt-1 ${isMobile ? 'text-[12px]' : 'text-[15px]'}`}>Windows is shutting down...</span>
            </div>
          </div>
        </div>
        <div style={{ height: barHeight, background: 'linear-gradient(180deg,#1a3c8e,#112888)', flexShrink: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent 5%, #b06000 25%, #b06000 75%, transparent 95%)' }} />
        </div>
      </div>
    );
  }

  // ─── WELCOME / LOGIN ───────────────────────────────────────────────────────
  const barHeight = isMobile ? 48 : 72;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col select-none cursor-default overflow-hidden"
      style={{ fontFamily: 'Tahoma, Arial, sans-serif', background: '#4a7cd0' }}
    >
      {/* TOP BAR — thick dark navy like the reference */}
      <div style={{
        height: barHeight, flexShrink: 0,
        background: 'linear-gradient(180deg, #1e4498 0%, #1a3c90 60%, #162f80 100%)',
        borderBottom: '3px solid #0f2060',
        boxShadow: '0 3px 10px rgba(0,0,0,0.4)',
      }} />

      {/* MIDDLE */}
      <div style={{
        flex: 1, display: 'flex', position: 'relative', overflow: 'hidden',
        flexDirection: isMobile ? 'column' : 'row',
      }}>

        {/* White radial glow */}
        <div style={{
          position: 'absolute',
          top: isMobile ? '-10%' : '-40%', left: isMobile ? '-30%' : '-20%',
          width: isMobile ? '160%' : '65%', height: isMobile ? '60%' : '180%',
          background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* ── LOGO + INTRO PANEL ── */}
        <div style={{
          flex: isMobile ? 'none' : 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          paddingBottom: isMobile ? 0 : 40,
          paddingTop: isMobile ? 32 : 0,
        }}>

          {/* Logo block */}
          <div style={{ position: 'relative', paddingRight: isMobile ? 56 : 70, paddingTop: 18, marginBottom: 16 }}>
            {/* Flag — top right of text block */}
            <img
              src={xpFlag}
              alt="Windows XP"
              style={{
                position: 'absolute', top: '-6px', right: '0',
                width: isMobile ? 52 : 68, height: isMobile ? 52 : 68, objectFit: 'contain',
                pointerEvents: 'none',
              }}
            />
            {/* "Microsoft®" */}
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.70)', letterSpacing: '0.5px', marginBottom: '2px' }}>
              Microsoft<sup style={{ fontSize: '6px', verticalAlign: 'super', marginLeft: '1px' }}>®</sup>
            </div>
            {/* "Windows xp" */}
            <div style={{ display: 'flex', alignItems: 'flex-end', lineHeight: 1 }}>
              <span style={{
                fontSize: isMobile ? 32 : 42, fontWeight: '700', color: 'white',
                textShadow: '0 2px 8px rgba(0,0,0,0.45)',
                letterSpacing: '-1.5px', lineHeight: 1,
              }}>Windows</span>
              <span style={{
                fontSize: isMobile ? 21 : 27, fontWeight: '700', fontStyle: 'italic',
                color: '#ff6600',
                textShadow: '0 1px 4px rgba(0,0,0,0.35)',
                marginLeft: '4px', marginBottom: '3px', lineHeight: 1,
              }}>xp</span>
            </div>
          </div>

          {/* "To begin..." */}
          <p style={{
            margin: 0, fontSize: '14px', color: 'white',
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            fontWeight: '400',
            alignSelf: isMobile ? 'center' : 'flex-start',
            marginLeft: isMobile ? 0 : 'calc(50% - 120px)',
          }}>
            To begin, {isMobile ? 'tap' : 'click'} your user name
          </p>
        </div>

        {/* Divider */}
        <div style={isMobile ? {
          height: '1px', width: '80%', flexShrink: 0, alignSelf: 'center', margin: '20px 0',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.35) 20%, rgba(255,255,255,0.35) 80%, transparent)',
        } : {
          width: '1px', flexShrink: 0, alignSelf: 'stretch', margin: '6% 0',
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.35) 20%, rgba(255,255,255,0.35) 80%, transparent)',
        }} />

        {/* ── PROFILE PANEL ── */}
        <div style={{
          flex: isMobile ? 'none' : 1,
          display: 'flex', flexDirection: 'column',
          justifyContent: isMobile ? 'flex-start' : 'center',
          alignItems: isMobile ? 'center' : 'stretch',
          paddingLeft: isMobile ? 0 : 60,
          paddingTop: isMobile ? 8 : 0,
        }}>

          {/* Profile card with always-visible blue highlight box */}
          <div
            onClick={() => handleProfileSelect('Sai Krishnan')}
            style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '10px 20px 10px 10px',
              borderRadius: '6px', cursor: 'pointer',
              background: 'rgba(80,130,220,0.55)',
              border: '1px solid rgba(150,190,255,0.5)',
              width: isMobile ? '85%' : undefined,
              maxWidth: isMobile ? 320 : 280,
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
              opacity: loggingInUser && loggingInUser !== 'Sai Krishnan' ? 0.4 : 1,
              transition: 'opacity 0.3s',
            }}
          >
            {/* Avatar */}
            <div style={{
              width: '52px', height: '52px', borderRadius: '4px',
              flexShrink: 0, overflow: 'hidden',
              border: '2px solid rgba(255,255,255,0.8)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
            }}>
              <div style={{ width: '100%', height: '100%', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>
                🏎️
              </div>
            </div>

            {/* Name & subtitle */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '17px', fontWeight: '700', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.5)', lineHeight: 1.25 }}>
                Sai Krishnan
              </span>
              {loggingInUser === 'Sai Krishnan' ? (
                <span style={{ fontSize: '11px', color: '#bfdbfe', marginTop: '3px' }}>
                  Loading your personal settings...
                </span>
              ) : (
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginTop: '3px' }}>
                  Computer Administrator
                </span>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{
        minHeight: barHeight, flexShrink: 0,
        background: 'linear-gradient(180deg, #1a3c8e 0%, #112578 100%)',
        borderTop: '3px solid #0f2060',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: isMobile ? 'center' : 'space-between',
        gap: isMobile ? 4 : 0,
        padding: isMobile ? '10px 16px' : '0 24px',
        position: 'relative',
      }}>
        {/* Orange accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent 5%, #b06000 20%, #b06000 80%, transparent 95%)' }} />

        {/* Turn off button */}
        <button
          onClick={() => setSystemState('shutting_down')}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '6px 12px', borderRadius: '4px',
            fontFamily: 'Tahoma, Arial, sans-serif',
          }}
        >
          <div style={{
            width: '26px', height: '26px', borderRadius: '50%',
            background: '#b02d1e', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}>
            <Power size={13} color="white" />
          </div>
          <span style={{ color: 'white', fontSize: '14px', fontWeight: '600', textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
            Turn off computer
          </span>
        </button>

        {!isMobile && (
          <span style={{
            color: 'rgba(180,210,255,0.85)', fontSize: '11px', fontWeight: '300',
            maxWidth: '400px', textAlign: 'right', lineHeight: 1.5,
            fontFamily: 'Tahoma, Arial, sans-serif',
          }}>
            After you log on, you can add or change accounts.<br />
            Just go to Control Panel and click User Accounts.
          </span>
        )}
      </div>
    </div>
  );
};
