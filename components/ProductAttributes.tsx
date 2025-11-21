
import React from 'react';
import { ProductAttribute } from '../types';

interface ProductAttributesProps {
  attributes: ProductAttribute[];
  selected: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

const ProductAttributes: React.FC<ProductAttributesProps> = ({ attributes, selected, onChange }) => {
  if (!attributes || attributes.length === 0) return null;

  return (
    <div className="space-y-6 py-4 border-t border-gray-100">
      {attributes.map((attr) => (
        <div key={attr.name} className="space-y-3">
          <div className="flex justify-between items-center">
             <span className="text-xs font-bold uppercase tracking-widest text-primary">{attr.name}</span>
             <span className="text-xs text-gray-500">{selected[attr.name]}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {attr.options.map((option) => {
              const isSelected = selected[attr.name] === option;
              const isColor = attr.name.toLowerCase() === 'color' || attr.name.toLowerCase() === 'warna';
              
              // Special rendering for Colors
              if (isColor) {
                // Map simple color names to hex for demo purposes
                const colorMap: Record<string, string> = {
                   'Merah': '#9B2C2C', 'Red': '#9B2C2C',
                   'Hitam': '#1A202C', 'Black': '#1A202C',
                   'Putih': '#F7FAFC', 'White': '#F7FAFC',
                   'Emas': '#D69E2E', 'Gold': '#D69E2E',
                   'Coklat': '#744210', 'Brown': '#744210',
                   'Terracotta': '#AD6C54'
                };
                const hex = colorMap[option] || '#E2E8F0';

                return (
                   <button
                    key={option}
                    onClick={() => onChange(attr.name, option)}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      isSelected ? 'ring-2 ring-offset-2 ring-primary border-transparent' : 'border-gray-200 hover:border-gray-400'
                    }`}
                    title={option}
                    aria-label={`Select color ${option}`}
                   >
                     <div className="w-full h-full rounded-full" style={{ backgroundColor: hex }}></div>
                   </button>
                );
              }

              // Default rendering for Size/Material etc
              return (
                <button
                  key={option}
                  onClick={() => onChange(attr.name, option)}
                  className={`
                    min-w-[40px] px-3 py-2 text-xs border rounded-lg transition-all
                    ${isSelected 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary/50'}
                  `}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductAttributes;
