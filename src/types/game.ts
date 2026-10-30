export type RoomId =
  | 'gate'
  | 'porch'
  | 'hallway'
  | 'parlor'
  | 'study'
  | 'kitchen'
  | 'attic'
  | 'crypt'
  | 'basement'
  | 'sanctum';

export type InspectId =
  | 'gate_briefcase'
  | 'lantern_zoom'
  | 'porch_door_lock'
  | 'window_storm'
  | 'hallway_rug'
  | 'hallway_table_ledger'
  | 'study_drawer'
  | 'clue_note'
  | 'kitchen_lock'
  | 'parlor_clock'
  | 'sanctum_desk'
  | 'dungeon_cell'
  | 'emado_dialogue'
  | 'final_letter'
  | 'basement_door_locked'
  | 'cellar_padlock'
  | 'attic_surveillance';

export type ItemId =
  | 'emado_badge'
  | 'lockpick'
  | 'porch_key'
  | 'brass_key'
  | 'reel_tape'
  | 'basement_key'
  | 'dungeon_keys'
  | 'bolt_cutter'
  | 'master_gate_key';

export interface InventoryItem {
  id: ItemId;
  name: string;
  description: string;
  iconName: string;
  details: string;
}

export interface CutsceneSlide {
  id: number;
  image: string;
  speaker?: string;
  text: string;
  subtext?: string;
}

export interface JournalEntry {
  id: string;
  timestamp: string;
  title: string;
  content: string;
  type: 'story' | 'clue' | 'discovery' | 'item';
}

export interface GameProgress {
  currentRoom: RoomId;
  activeInspect: InspectId | null;
  inventory: ItemId[];
  selectedItem: ItemId | null;

  // Story & Character flags
  cutsceneSeen: boolean;
  briefcaseExamined: boolean;
  emadoBadgeFound: boolean;
  lockpickAcquired: boolean;
  porchLanternExamined: boolean;
  porchKeyFound: boolean;
  porchDoorUnlocked: boolean;

  // Mystery & Puzzles
  rugExamined: boolean;
  brassKeyFound: boolean;
  studyDrawerUnlocked: boolean;
  clueNoteRead: boolean;
  parlorClockSolved: boolean;
  parlorClockTime: { hours: number; minutes: number };
  kitchenLockSolved: boolean;
  basementKeyFound: boolean;
  basementDoorUnlocked: boolean;

  // Sanctum & Dungeon flags
  sanctumTapeListened: boolean;
  dungeonKeysFound: boolean;
  boltCutterFound: boolean;
  dungeonCellUnlocked: boolean;
  emadoFreed: boolean;
  masterGateKeyFound: boolean;
  finalLetterRead: boolean;

  // Lock combinations
  kitchenLockCode: [number, number, number, number];

  // Tension & Weather
  tensionLevel: number;
  isWeatherActive: boolean;

  // Stats
  gameCompleted: boolean;
  startTime: number;
  elapsedSeconds: number;
  visitedRooms: RoomId[];
  journal: JournalEntry[];
}
