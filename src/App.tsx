/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TitleScreen } from './components/TitleScreen';
import { CutsceneIntro } from './components/CutsceneIntro';
import { RoomView } from './components/RoomView';
import { InspectionModal } from './components/InspectionModal';
import { DungeonCellModal } from './components/DungeonCellModal';
import { SanctumModal } from './components/SanctumModal';
import { ClockPuzzleModal } from './components/ClockPuzzleModal';
import { InventoryBar } from './components/InventoryBar';
import { GameHUD } from './components/GameHUD';
import { JournalModal } from './components/JournalModal';
import { VictoryModal } from './components/VictoryModal';
import { GameProgress, RoomId, InspectId, ItemId, JournalEntry } from './types/game';
import { sound } from './utils/audio';

const STORAGE_KEY = 'the_last_house_mystery_v3';

const INITIAL_STATE: GameProgress = {
  currentRoom: 'gate',
  activeInspect: null,
  inventory: [],
  selectedItem: null,

  cutsceneSeen: false,
  briefcaseExamined: false,
  emadoBadgeFound: false,
  lockpickAcquired: false,
  porchLanternExamined: false,
  porchKeyFound: false,
  porchDoorUnlocked: false,

  rugExamined: false,
  brassKeyFound: false,
  studyDrawerUnlocked: false,
  clueNoteRead: false,
  parlorClockSolved: false,
  parlorClockTime: { hours: 12, minutes: 0 },
  kitchenLockSolved: false,
  basementKeyFound: false,
  basementDoorUnlocked: false,

  sanctumTapeListened: false,
  dungeonKeysFound: false,
  boltCutterFound: false,
  dungeonCellUnlocked: false,
  emadoFreed: false,
  masterGateKeyFound: false,
  finalLetterRead: false,

  kitchenLockCode: [0, 0, 0, 0],

  tensionLevel: 1,
  isWeatherActive: true,

  gameCompleted: false,
  startTime: Date.now(),
  elapsedSeconds: 0,
  visitedRooms: ['gate'],
  journal: [
    {
      id: 'entry_start',
      timestamp: '00:00',
      title: 'بدء عملية الإنقاذ · بوابة البيت الأخير',
      content: 'وصلت المحققة "إكرامو" في ليلة عاصفة ممطرة بعد انقطاع الاتصال بالباحث "عمادو". آثار سحل واضحة وحقيبة ملقاة في الطين تشير إلى كمين غادر نفذه "سليمان الأعرج" بأمر من "الدكتور برهان الكاظم".',
      type: 'story',
    },
  ],
};

export default function App() {
  const [screen, setScreen] = useState<'TITLE' | 'CUTSCENE' | 'PLAYING' | 'VICTORY'>('TITLE');
  const [hasSavedGame, setHasSavedGame] = useState<boolean>(false);
  const [gameState, setGameState] = useState<GameProgress>(INITIAL_STATE);

  // Modals & UI states
  const [activeInspect, setActiveInspect] = useState<InspectId | null>(null);
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);
  const [isDungeonModalOpen, setIsDungeonModalOpen] = useState<boolean>(false);
  const [isSanctumModalOpen, setIsSanctumModalOpen] = useState<boolean>(false);
  const [isClockModalOpen, setIsClockModalOpen] = useState<boolean>(false);

  const [highlightHotspots, setHighlightHotspots] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [unreadJournalCount, setUnreadJournalCount] = useState<number>(0);

  // Load game from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.currentRoom) {
          setHasSavedGame(true);
        }
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  // Timer interval while playing
  useEffect(() => {
    if (screen !== 'PLAYING' || gameState.gameCompleted) return;

    const timer = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        elapsedSeconds: prev.elapsedSeconds + 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, gameState.gameCompleted]);

  // Adjust audio tension based on room depth
  useEffect(() => {
    if (screen !== 'PLAYING') return;
    if (gameState.currentRoom === 'basement' || gameState.currentRoom === 'sanctum') {
      sound.setTensionLevel(2.5);
    } else {
      sound.setTensionLevel(1.0);
    }
  }, [gameState.currentRoom, screen]);

  // Persist state to localStorage
  useEffect(() => {
    if (screen === 'PLAYING' || screen === 'VICTORY') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
        setHasSavedGame(true);
      } catch {
        // Storage quota
      }
    }
  }, [gameState, screen]);

  // Auto-clear toast
  useEffect(() => {
    if (!toastMessage) return;
    const timeout = setTimeout(() => {
      setToastMessage(null);
    }, 4500);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  const addJournalEntry = (title: string, content: string, type: JournalEntry['type']) => {
    const mins = Math.floor(gameState.elapsedSeconds / 60);
    const secs = gameState.elapsedSeconds % 60;
    const timestamp = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    const newEntry: JournalEntry = {
      id: `entry_${Date.now()}`,
      timestamp,
      title,
      content,
      type,
    };

    setGameState((prev) => ({
      ...prev,
      journal: [newEntry, ...prev.journal],
    }));
    setUnreadJournalCount((c) => c + 1);
  };

  const handleStartNewGame = () => {
    const fresh: GameProgress = {
      ...INITIAL_STATE,
      startTime: Date.now(),
    };
    setGameState(fresh);
    setActiveInspect(null);
    setIsJournalOpen(false);
    setIsDungeonModalOpen(false);
    setIsSanctumModalOpen(false);
    setIsClockModalOpen(false);
    setScreen('CUTSCENE');
    sound.startAmbience();
  };

  const handleResumeGame = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setGameState(parsed);
        if (parsed.gameCompleted) {
          setScreen('VICTORY');
        } else {
          setScreen('PLAYING');
        }
        sound.startAmbience();
        return;
      }
    } catch {
      // Fallback
    }
    handleStartNewGame();
  };

  const handleResetSave = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSavedGame(false);
    setGameState(INITIAL_STATE);
  };

  const handleNavigateRoom = (roomId: RoomId) => {
    sound.playFootsteps();
    setActiveInspect(null);
    setGameState((prev) => ({
      ...prev,
      currentRoom: roomId,
      visitedRooms: prev.visitedRooms.includes(roomId)
        ? prev.visitedRooms
        : [...prev.visitedRooms, roomId],
    }));

    // If at the gate and has master gate key and emado is freed -> trigger victory!
    if (roomId === 'gate' && gameState.masterGateKeyFound && gameState.emadoFreed) {
      setTimeout(() => {
        handleEscapeVictory();
      }, 500);
    }
  };

  const handleInspect = (inspectId: InspectId) => {
    if (inspectId === 'parlor_clock') {
      setIsClockModalOpen(true);
    } else if (inspectId === 'dungeon_cell') {
      setIsDungeonModalOpen(true);
    } else if (inspectId === 'sanctum_desk') {
      setIsSanctumModalOpen(true);
    } else {
      setActiveInspect(inspectId);
    }
  };

  // Puzzle Actions:
  const handleCollectBriefcaseItems = () => {
    setGameState((prev) => ({
      ...prev,
      briefcaseExamined: true,
      emadoBadgeFound: true,
      lockpickAcquired: true,
      inventory: [
        ...prev.inventory,
        ...(prev.inventory.includes('emado_badge') ? [] : (['emado_badge'] as ItemId[])),
        ...(prev.inventory.includes('lockpick') ? [] : (['lockpick'] as ItemId[])),
      ],
    }));
    addJournalEntry(
      'فحص حقيبة عمادو',
      'عثرت في الوحل على شارة عمادو الجنائية وأداة نقر معدنية (Lockpick). عمادو في خطر وشيك داخل هذا البيت.',
      'item'
    );
    setToastMessage('تمت استعادة شارة عمادو وأداة النقر المعدنية!');
  };

  const handleCollectPorchKey = () => {
    setGameState((prev) => ({
      ...prev,
      porchKeyFound: true,
      porchLanternExamined: true,
      inventory: prev.inventory.includes('porch_key') ? prev.inventory : [...prev.inventory, 'porch_key'],
    }));
    addJournalEntry(
      'مفتاح الفانوس السري',
      'عثرت على مفتاح نحاسي صغير مخبأ أسفل قاعدة الفانوس الزيتي المشتعل في الشرفة. هذا المفتاح يفتح الباب البلوطي المقوس.',
      'item'
    );
    setToastMessage('حصلتِ على مفتاح الفانوس السري للباب الرئيسي!');
  };

  const handleUnlockPorchDoor = () => {
    sound.playUnlock();
    setGameState((prev) => ({
      ...prev,
      porchDoorUnlocked: true,
      currentRoom: 'hallway',
      visitedRooms: prev.visitedRooms.includes('hallway')
        ? prev.visitedRooms
        : [...prev.visitedRooms, 'hallway'],
    }));
    addJournalEntry(
      'فتح باب الشرفة البلوطي',
      'تم فتح القفل البلوطي للشرفة والدخول مباشرة إلى ردهة الاستقبال الرئيسية للبيت الأخير.',
      'discovery'
    );
    setActiveInspect(null);
    setToastMessage('انفتح القفل البلوطي ودخلتِ إلى ردهة البيت الأخير!');
  };

  const handleCollectBrassKey = () => {
    sound.playKeyPickup();
    setGameState((prev) => ({
      ...prev,
      brassKeyFound: true,
      inventory: prev.inventory.includes('brass_key') ? prev.inventory : [...prev.inventory, 'brass_key'],
    }));
    addJournalEntry(
      'المفتاح النحاسي تحت السجادة',
      'رفعت طرف السجادة الفارسية في ردهة الاستقبال وعثرت على مفتاح نحاسي قديم محفور بزهرة الزنبق.',
      'item'
    );
    setToastMessage('عثرتِ على مفتاح نحاسي قديم وتمت إضافته للحقيبة!');
  };

  const handleUnlockStudyDrawer = () => {
    sound.playUnlock();
    setGameState((prev) => ({
      ...prev,
      studyDrawerUnlocked: true,
      selectedItem: prev.selectedItem === 'brass_key' ? null : prev.selectedItem,
    }));
    addJournalEntry(
      'فتح درج مكتب الدكتور برهان',
      'استخدمت المفتاح النحاسي لفتح درج المكتب في غرفة المكتبة، كاشفاً عن وثائق قديمة وساعة جيب.',
      'discovery'
    );
    setToastMessage('انفتح درج مكتب الدكتور برهان بنجاح!');
    setActiveInspect('clue_note');
  };

  const handleReadClueNote = () => {
    sound.playPaperRustle();
    setGameState((prev) => ({
      ...prev,
      clueNoteRead: true,
    }));
    addJournalEntry(
      'وثيقة سنة الرحيل (1986)',
      'وجدت وثيقة مطوية داخل الدرج كُتب عليها: "السر يكمن في سنة الرحيل 1986". هذا الرقم هو رمز قفل خزانة المطبخ.',
      'clue'
    );
    setToastMessage('تم تسجيل الرقم 1986 في سجل التحقيق!');
  };

  const handleSolveClock = () => {
    setGameState((prev) => ({
      ...prev,
      parlorClockSolved: true,
      parlorClockTime: { hours: 3, minutes: 45 },
      inventory: prev.inventory.includes('reel_tape') ? prev.inventory : [...prev.inventory, 'reel_tape'],
    }));
    addJournalEntry(
      'حل لغز ساعة البندول (03:45)',
      'ضبطت عقارب ساعة البندول عند الثالثة وخمس وأربعين دقيقة فجراً، فانزلق درج سري يحتوي على شريط التسجيل السري (رقم 4) الخاص بالدكتور برهان الكاظم.',
      'discovery'
    );
    setToastMessage('انفتح درج الساعة السري! حصلتِ على شريط التسجيل رقم 4.');
  };

  const handleSolveKitchenLock = () => {
    sound.playUnlock();
    setGameState((prev) => ({
      ...prev,
      kitchenLockSolved: true,
    }));
    addJournalEntry(
      'فك قفل خزانة المطبخ (1986)',
      'أدخلت الرقم السري 1986 في القفل الأسطواني لخزانة المطبخ، فسقطت السلاسل وظهر مفتاح القبو الحديدي.',
      'discovery'
    );
    setToastMessage('انفك قفل خزانة المطبخ بالرمز 1986!');
  };

  const handleCollectBasementKey = () => {
    sound.playKeyPickup();
    setGameState((prev) => ({
      ...prev,
      basementKeyFound: true,
      inventory: prev.inventory.includes('basement_key') ? prev.inventory : [...prev.inventory, 'basement_key'],
    }));
    addJournalEntry(
      'مفتاح القبو الثقيل',
      'استخرجت مفتاحاً حديدياً أسود ثقيلاً من خزانة المطبخ. هذا المفتاح يفتح سلالم القبو المؤدية لزنزانة عمادو.',
      'item'
    );
    setToastMessage('حصلتِ على مفتاح القبو الثقيل!');
  };

  const handleUnlockBasementDoor = () => {
    sound.playUnlock();
    setGameState((prev) => ({
      ...prev,
      basementDoorUnlocked: true,
      currentRoom: 'basement',
      visitedRooms: prev.visitedRooms.includes('basement') ? prev.visitedRooms : [...prev.visitedRooms, 'basement'],
      selectedItem: prev.selectedItem === 'basement_key' ? null : prev.selectedItem,
    }));
    addJournalEntry(
      'اقتحام القبو الحجري',
      'فتحت الباب الحديدي الضخم ونزلت إلى القبو السفلي. صوت أنين عمادو يُسمع بوضوح من وراء القضبان!',
      'discovery'
    );
    setToastMessage('انفتح باب القبو ونزلتِ إلى الأعماق!');
  };

  const handleListenSanctumTape = () => {
    setGameState((prev) => ({
      ...prev,
      sanctumTapeListened: true,
    }));
    addJournalEntry(
      'سماع اعترافات الدكتور برهان',
      'استمعت لشريط التسجيل في مكتب العمليات، برهان يعترف باحتجاز عمادو في الزنزانة ويكشف موقع المفاتيح ومقص السلاسل على مكتبه.',
      'clue'
    );
  };

  const handleCollectDungeonKeys = () => {
    setGameState((prev) => ({
      ...prev,
      dungeonKeysFound: true,
      inventory: prev.inventory.includes('dungeon_keys') ? prev.inventory : [...prev.inventory, 'dungeon_keys'],
    }));
    addJournalEntry(
      'طقم مفاتيح زنزانة القبو',
      'استوليت على طقم مفاتيح الزنزانة من مكتب دكتور برهان لفتح البوابة الحديدية على عمادو.',
      'item'
    );
    setToastMessage('حصلتِ على طقم مفاتيح زنزانة القبو!');
  };

  const handleCollectBoltCutter = () => {
    setGameState((prev) => ({
      ...prev,
      boltCutterFound: true,
      inventory: prev.inventory.includes('bolt_cutter') ? prev.inventory : [...prev.inventory, 'bolt_cutter'],
    }));
    addJournalEntry(
      'مقص الحديد الثقيل (Bolt Cutter)',
      'عثرت على مقص حديدي قوي قادر على قطع الأغلال والسلاسل الملتفة حول عمادو.',
      'item'
    );
    setToastMessage('حصلتِ على مقص الحديد الثقيل!');
  };

  const handleUnlockDungeonCell = () => {
    setGameState((prev) => ({
      ...prev,
      dungeonCellUnlocked: true,
    }));
    addJournalEntry(
      'فتح بوابة الزنزانة',
      'استخدمت طقم المفاتيح وفتحت بوابة الزنزانة، عمادو مقيد بسلاسل حديدية بالجدار.',
      'discovery'
    );
  };

  const handleFreeEmado = () => {
    setGameState((prev) => ({
      ...prev,
      emadoFreed: true,
    }));
    addJournalEntry(
      'تحرير عمادو من السلاسل',
      'قطعت السلاسل بمقص الحديد وتحرر عمادو! عمادو بخير ويستعد للهرب معي.',
      'story'
    );
    setToastMessage('تم تحرير عمادو بنجاح!');
  };

  const handleCollectMasterKey = () => {
    setGameState((prev) => ({
      ...prev,
      masterGateKeyFound: true,
      inventory: prev.inventory.includes('master_gate_key') ? prev.inventory : [...prev.inventory, 'master_gate_key'],
    }));
    addJournalEntry(
      'المفتاح الرئيسي للبوابة الكبرى',
      'سلمني عمادو المفتاح الذهبي للبوابة الكبرى الذي سرقه من سليمان الأعرج قبل إغمائه. طريق الهروب مفتوح الآن!',
      'item'
    );
    setToastMessage('استلمتِ المفتاح الرئيسي للبوابة الكبرى! توجها نحو البوابة للهروب.');
  };

  const handleEscapeVictory = () => {
    sound.playVictory();
    setGameState((prev) => ({
      ...prev,
      gameCompleted: true,
    }));
    addJournalEntry(
      'الهروب الكبير وسقوط عصابة برهان',
      'فتحت إكرامو البوابة الكبرى بالمفتاح الرئيسي وفرت رفقة عمادو حاملين أشرطة التسجيل وملفات 1986. سقط البيت الأخير!',
      'story'
    );
    setIsDungeonModalOpen(false);
    setActiveInspect(null);
    setScreen('VICTORY');
  };

  const handleSelectItem = (id: ItemId | null) => {
    setGameState((prev) => ({
      ...prev,
      selectedItem: id,
    }));
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleWeather = () => {
    setGameState((prev) => ({
      ...prev,
      isWeatherActive: !prev.isWeatherActive,
    }));
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-stone-950 text-stone-100 overflow-hidden font-cairo select-none">
      
      {/* 1. TITLE SCREEN */}
      {screen === 'TITLE' && (
        <TitleScreen
          onStartGame={handleStartNewGame}
          onResumeGame={handleResumeGame}
          hasSavedGame={hasSavedGame}
          onResetSave={handleResetSave}
        />
      )}

      {/* 2. OPENING CUTSCENE */}
      {screen === 'CUTSCENE' && (
        <CutsceneIntro
          onComplete={() => {
            sound.playFootsteps();
            setScreen('PLAYING');
          }}
        />
      )}

      {/* 3. PLAYING VIEW (FULL-SCREEN LANDSCAPE) */}
      {screen === 'PLAYING' && (
        <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
          
          {/* Top Diegetic In-Game HUD */}
          <GameHUD
            currentRoom={gameState.currentRoom}
            elapsedSeconds={gameState.elapsedSeconds}
            highlightHotspots={highlightHotspots}
            unreadJournalCount={unreadJournalCount}
            isMuted={isMuted}
            isWeatherActive={gameState.isWeatherActive}
            onToggleHighlightHotspots={() => setHighlightHotspots((prev) => !prev)}
            onOpenJournal={() => {
              setIsJournalOpen(true);
              setUnreadJournalCount(0);
            }}
            onToggleSound={handleToggleSound}
            onToggleWeather={handleToggleWeather}
            onReturnTitle={() => setScreen('TITLE')}
          />

          {/* Center Playfield (16:9 Landscape) */}
          <main className="flex-1 relative w-full h-full flex items-center justify-center p-1 md:p-3">
            <RoomView
              currentRoom={gameState.currentRoom}
              gameState={gameState}
              highlightHotspots={highlightHotspots}
              onNavigate={handleNavigateRoom}
              onInspect={handleInspect}
              onShowMessage={(msg) => setToastMessage(msg)}
            />
          </main>

          {/* Bottom Inventory Bar Satchel */}
          <InventoryBar
            inventory={gameState.inventory}
            selectedItem={gameState.selectedItem}
            onSelectItem={handleSelectItem}
          />

          {/* Active Inspection Modal */}
          {activeInspect && (
            <InspectionModal
              inspectId={activeInspect}
              gameState={gameState}
              onClose={() => setActiveInspect(null)}
              onCollectBriefcaseItems={handleCollectBriefcaseItems}
              onCollectPorchKey={handleCollectPorchKey}
              onUnlockPorchDoor={handleUnlockPorchDoor}
              onCollectBrassKey={handleCollectBrassKey}
              onUnlockStudyDrawer={handleUnlockStudyDrawer}
              onReadClueNote={handleReadClueNote}
              onSolveKitchenLock={handleSolveKitchenLock}
              onCollectBasementKey={handleCollectBasementKey}
              onUnlockBasementDoor={handleUnlockBasementDoor}
              onCompleteGame={handleEscapeVictory}
              onOpenJournal={() => {
                setActiveInspect(null);
                setIsJournalOpen(true);
              }}
            />
          )}

          {/* Parlor Clock Puzzle Modal */}
          {isClockModalOpen && (
            <ClockPuzzleModal
              gameState={gameState}
              onClose={() => setIsClockModalOpen(false)}
              onSolveClock={handleSolveClock}
            />
          )}

          {/* Dr. Borhan's Sanctum Lab Modal */}
          {isSanctumModalOpen && (
            <SanctumModal
              gameState={gameState}
              onClose={() => setIsSanctumModalOpen(false)}
              onListenTape={handleListenSanctumTape}
              onCollectDungeonKeys={handleCollectDungeonKeys}
              onCollectBoltCutter={handleCollectBoltCutter}
            />
          )}

          {/* Dungeon Cell Modal (Rescuing Emado) */}
          {isDungeonModalOpen && (
            <DungeonCellModal
              gameState={gameState}
              onClose={() => setIsDungeonModalOpen(false)}
              onUnlockCell={handleUnlockDungeonCell}
              onFreeEmado={handleFreeEmado}
              onCollectMasterKey={handleCollectMasterKey}
            />
          )}

          {/* Detective Journal Modal */}
          {isJournalOpen && (
            <JournalModal
              gameState={gameState}
              onClose={() => setIsJournalOpen(false)}
              onNavigateRoom={(roomId) => handleNavigateRoom(roomId)}
            />
          )}

          {/* Toast Notification Banner */}
          {toastMessage && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[90%] px-4 py-2.5 rounded-xl bg-amber-950/95 border border-amber-600/70 text-amber-200 text-xs md:text-sm text-center shadow-2xl animate-in slide-in-from-top-4 duration-200 backdrop-blur-sm font-serif-arabic">
              {toastMessage}
            </div>
          )}
        </div>
      )}

      {/* 4. VICTORY VIEW */}
      {screen === 'VICTORY' && (
        <VictoryModal
          gameState={gameState}
          onRestart={handleStartNewGame}
          onReviewJournal={() => setIsJournalOpen(true)}
        />
      )}

      {/* Persistent Journal in Victory modal */}
      {screen === 'VICTORY' && isJournalOpen && (
        <JournalModal
          gameState={gameState}
          onClose={() => setIsJournalOpen(false)}
        />
      )}
    </div>
  );
}
