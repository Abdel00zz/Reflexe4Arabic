/**
 * @file This file contains the HelpModal component.
 * It provides a simple modal dialog to explain how to use the application.
 */

import React from 'react';
import { IoMdClose } from 'react-icons/io';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 relative"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="إِغْلَاق"
        >
          <IoMdClose className="h-8 w-8" />
        </button>

        <h2 className="text-3xl sm:text-4xl font-bold text-cyan-600 mb-6 text-center">كَيْفِيَّةُ اللَّعِبِ</h2>
        <div className="space-y-4 text-lg text-slate-600">
            <p>أَهْلًا بِكَ فِي <strong>مُغَامَرَةِ تَعَلُّمِ الْعَرَبِيَّةِ</strong>!</p>
            <p>هَذَا التَّطْبِيقُ مُصَمَّمٌ لِمُسَاعَدَتِكَ عَلَى تَعَلُّمِ اللُّغَةِ الْعَرَبِيَّةِ بِطَرِيقَةٍ مُمْتِعَةٍ.</p>
            <ul className="list-disc list-inside space-y-2 pr-4">
                <li><strong>اِخْتَرْ لُعْبَةً:</strong> مِنَ الْقَائِمَةِ الرَّئِيسِيَّةِ، اِخْتَرْ أَحَدَ التَّمَارِينِ لِتَبْدَأَ.</li>
                <li><strong>أَجِبْ عَنِ الْأَسْئِلَةِ:</strong> اِتَّبِعِ التَّعْلِيمَاتِ فِي كُلِّ لُعْبَةٍ لِحَلِّ الْأَسْئِلَةِ.</li>
                <li><strong>اِكْسَبِ النِّقَاطَ:</strong> كُلُّ إِجَابَةٍ صَحِيحَةٍ تَمْنَحُكَ نِقَاطًا. حَاوِلْ تَحْقِيقَ أَعْلَى نَتِيجَةٍ!</li>
                <li><strong>تَعَلَّمْ وَاسْتَمْتِعْ:</strong> الْهَدَفُ هُوَ التَّعَلُّمُ مِنَ الْأَخْطَاءِ وَالِاسْتِمْتَاعُ بِالرِّحْلَةِ.</li>
            </ul>
             <p className="font-bold text-center pt-4">بِالتَّوْفِيقِ!</p>
        </div>
      </div>
    </div>
  );
};
