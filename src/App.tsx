import { Desktop } from './components/Desktop';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { useStore } from './store';
import { WindowComponent } from './components/WindowComponent';
import { MyComputer } from './apps/MyComputer';
import { Notepad } from './apps/Notepad';
import { InternetExplorer } from './apps/InternetExplorer';
import { Terminal } from './apps/Terminal';
import { Paint } from './apps/Paint';
import { AboutMe } from './apps/AboutMe';
import { MyProjects } from './apps/MyProjects';
import { ContactMe } from './apps/ContactMe';
import { BootScreen } from './components/BootScreen';
import CRTOverlay from './components/CRTOverlay';
import { WelcomeToast } from './components/WelcomeToast';

function App() {
  const { windows, systemState, crtEnabled } = useStore();

  if (systemState !== 'running') {
    return (
      <>
        <BootScreen />
        <CRTOverlay />
      </>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col font-sans select-none text-black bg-[#004E98]">
      <Desktop />

      {/* Windows Layer */}
      {windows.map((win) => (
        <WindowComponent key={win.id} window={win}>
          {win.appType === 'mycomputer' && <MyComputer initialView={win.appProps?.initialView} />}
          {win.appType === 'notepad' && <Notepad initialText={win.appProps?.initialText} />}
          {win.appType === 'ie' && <InternetExplorer />}
          {win.appType === 'cmd' && <Terminal />}
          {win.appType === 'paint' && <Paint />}
          {win.appType === 'aboutme' && <AboutMe />}
          {win.appType === 'myprojects' && <MyProjects />}
          {win.appType === 'contactme' && <ContactMe />}
        </WindowComponent>
      ))}

      <StartMenu />
      <WelcomeToast />
      <Taskbar />

      {/* CRT monitor overlay — always on top, never blocks clicks */}
      {crtEnabled && <CRTOverlay />}
    </div>
  );
}

export default App;
