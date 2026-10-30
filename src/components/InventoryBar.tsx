import React, { useState } from 'react';
import { Key, KeyRound, Info, X, Check, Backpack, Wrench, CassetteTape, Scissors, ShieldAlert, BadgeAlert, Eye } from 'lucide-react';
import { INVENTORY_ITEMS, ASSET_IMAGES } from '../data/gameData';
import { ItemId } from '../types/game';
import { sound } from '../utils/audio';

interface InventoryBarProps {
  inventory: ItemId[];
  selectedItem: ItemId | null;
  onSelectItem: (id: ItemId | null) => void;
}

export const InventoryBar: React.FC<InventoryBarProps> = ({
  inventory,
  selectedItem,
  onSelectItem,
}) => {
  const [inspectedItem, setInspectedItem] = useState<ItemId | null>(null);

  const handleItemClick = (id: ItemId) => {
    sound.playPaperRustle();
    if (selectedItem === id) {
      onSelectItem(null);
    } else {
      onSelectItem(id);
    }
  };

  const getIcon = (id: ItemId) => {
    switch (id) {
      case 'emado_badge':
        return <BadgeAlert className="w-4 h-4 text-[#8c2d19]" />;
      case 'lockpick':
        return <Wrench className="w-4 h-4 text-[#5c3e21]" />;
      case 'porch_key':
        return <Key className="w-4 h-4 text-[#b45309]" />;
      case 'brass_key':
        return <Key className="w-4 h-4 text-[#b45309]" />;
      case 'reel_tape':
        return <CassetteTape className="w-4 h-4 text-[#7c2d12]" />;
      case 'basement_key':
        return <KeyRound className="w-4 h-4 text-[#262626]" />;
      case 'dungeon_keys':
        return <Key className="w-4 h-4 text-[#78350f]" />;
      case 'bolt_cutter':
        return <Scissors className="w-4 h-4 text-[#831843]" />;
      case 'master_gate_key':
        return <ShieldAlert className="w-4 h-4 text-[#047857] animate-pulse" />;
      default:
        return <Key className="w-4 h-4 text-[#b45309]" />;
    }
  };

  const getItemVisualPhoto = (id: ItemId) => {
    switch (id) {
      case 'emado_badge':
      case 'lockpick':
        return ASSET_IMAGES.briefcase_mud;
      case 'porch_key':
        return ASSET_IMAGES.lantern_zoom;
      case 'brass_key':
        return ASSET_IMAGES.hallway_rug_closeup;
      case 'reel_tape':
        return ASSET_IMAGES.sanctum;
      case 'basement_key':
        return ASSET_IMAGES.kitchen_cabinet_lock;
      case 'dungeon_keys':
      case 'bolt_cutter':
        return ASSET_IMAGES.dungeon;
      case 'master_gate_key':
        return ASSET_IMAGES.gate;
      default:
        return ASSET_IMAGES.briefcase_mud;
    }
  };

  return (
    <>
      {/* Bottom Inventory Bar styled like an Antique Aged Leather & Parchment Satchel */}
      <div 
        className="w-full border-t-2 border-[#7a5833] px-3 md:px-8 py-2.5 flex items-center justify-between text-xs z-30 select-none shadow-2xl font-cairo"
        dir="rtl"
        style={{
          backgroundColor: '#f4e5cc',
          backgroundImage: 'radial-gradient(#dec29b 1px, transparent 1px), radial-gradient(#ead0ad 1px, #f4e5cc 1px)',
          backgroundSize: '20px 20px',
          boxShadow: 'inset 0 3px 12px rgba(100,65,30,0.25), 0 -4px 20px rgba(0,0,0,0.6)',
        }}
      >
        
        {/* Right side (RTL start): Satchel Label and Active In-Hand indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[#462d18]">
            <div className="w-7 h-7 rounded-lg bg-[#ebd5b3] border border-[#a68258] flex items-center justify-center shadow-inner">
              <Backpack className="w-4 h-4 text-[#8c2d19]" />
            </div>
            <span className="font-bold text-[#38200e] font-serif-arabic hidden sm:inline">حقيبة إكرامو الميدانية:</span>
          </div>

          {selectedItem && (
            <div 
              onClick={() => setInspectedItem(selectedItem)}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#ebd2af] border-2 border-[#8c2d19] text-[#381c0c] text-xs font-serif-arabic shadow-md cursor-pointer hover:bg-[#e4c7a0] transition-colors"
              title="انقر لمعاينة العنصر في يدك"
            >
              <span className="w-2 h-2 rounded-full bg-[#8c2d19] animate-ping" />
              <span className="font-bold">بيدك الآن:</span>
              <span className="font-semibold text-[#661e10]">{INVENTORY_ITEMS[selectedItem]?.name}</span>
              <Eye className="w-3.5 h-3.5 text-[#8c2d19]" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playPaperRustle();
                  onSelectItem(null);
                }}
                className="hover:text-red-700 p-0.5 cursor-pointer mr-1"
                title="إلغاء التجهيز"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Center / Left: Inventory item parchment stamps */}
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          {inventory.length === 0 ? (
            <span className="text-[#785b3b] text-xs font-serif-arabic italic px-2">
              الحقيبة فارغة... تفحصي حقيبة عمادو الملقاة في الوحل عند البوابة الخارجية.
            </span>
          ) : (
            inventory.map((itemId) => {
              const item = INVENTORY_ITEMS[itemId];
              const isSelected = selectedItem === itemId;

              return (
                <div key={itemId} className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleItemClick(itemId)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer font-serif-arabic ${
                      isSelected
                        ? 'bg-[#e2c7a3] border-[#8c2d19] text-[#2c1507] shadow-md ring-2 ring-amber-800/40 font-bold scale-105'
                        : 'bg-[#ede0c9] border-[#ab8a64] hover:border-[#8c2d19] text-[#3b2311] hover:bg-[#e5d3b6]'
                    }`}
                    title={isSelected ? 'بيدك الآن - انقر لإلغاء التجهيز' : 'انقر لتجهيز العنصر بيدك للاستخدام'}
                  >
                    {getIcon(itemId)}
                    <span className="font-bold text-xs whitespace-nowrap">{item.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#8c2d19]" />}
                  </button>

                  {/* Detailed Inspect Button */}
                  <button
                    onClick={() => {
                      sound.playPaperRustle();
                      setInspectedItem(itemId);
                    }}
                    className="p-1.5 rounded-lg bg-[#ede0c9] hover:bg-[#e2c7a3] border border-[#ab8a64] text-[#634528] hover:text-[#8c2d19] transition-colors cursor-pointer"
                    title="فحص صورة العنصر في يدك"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 2. REALISTIC IN-HAND ITEM PREVIEW MODAL (صورة بيدك انفنتوري) */}
      {inspectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-150 font-cairo" dir="rtl">
          <div 
            className="relative w-full max-w-md p-6 rounded-2xl shadow-2xl border-4 border-[#7a5833] text-[#2b1f14]"
            style={{
              backgroundColor: '#f5e7cd',
              backgroundImage: 'radial-gradient(#dec29b 1px, transparent 1px), radial-gradient(#ebd4b3 1px, #f5e7cd 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#b0936f] mb-4">
              <div className="flex items-center gap-2">
                {getIcon(inspectedItem)}
                <div>
                  <h3 className="font-bold text-[#3b200e] font-serif-arabic text-base">
                    {INVENTORY_ITEMS[inspectedItem]?.name}
                  </h3>
                  <p className="text-[10px] text-[#785b3b]">عنصر ميداني في حوزة إكرامو</p>
                </div>
              </div>
              <button
                onClick={() => setInspectedItem(null)}
                className="w-7 h-7 rounded-full bg-[#dfc6a3] hover:bg-[#cfaf85] text-[#3d2411] font-bold flex items-center justify-center cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            {/* In-Hand Realistic Photo Visual */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-[#8c6d48] shadow-inner mb-4 bg-stone-900 group">
              <img
                src={getItemVisualPhoto(inspectedItem)}
                alt={INVENTORY_ITEMS[inspectedItem]?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-stone-950/80 border border-amber-800 text-[10px] text-amber-200 font-serif-arabic">
                معاينة واقعية للأداة
              </div>
            </div>

            {/* Description & Usage */}
            <div className="space-y-2 mb-5">
              <p className="text-xs text-[#412711] leading-relaxed font-serif-arabic bg-[#ebd7b9] p-3 rounded-lg border border-[#c4a984]">
                {INVENTORY_ITEMS[inspectedItem]?.details}
              </p>
              <p className="text-[11px] text-[#705234] italic font-serif-arabic">
                {INVENTORY_ITEMS[inspectedItem]?.description}
              </p>
            </div>

            {/* Action to Hold in Hand */}
            <button
              onClick={() => {
                sound.playPaperRustle();
                onSelectItem(inspectedItem);
                setInspectedItem(null);
              }}
              className="w-full py-3 rounded-xl bg-[#7c2d12] hover:bg-[#991b1b] text-amber-100 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>إمساك الأداة بيدك للاستخدام على الأبواب والأقفال</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
