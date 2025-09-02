/**
 * @file This file contains the HelpModal component.
 * It displays a friendly user guide explaining the different exercises and application features.
 */

import React from 'react';
import { IoMdClose } from 'react-icons/io';

// Props interface for the HelpModal component.
interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * A modal component that provides a guide on how to use the application.
 * @param {HelpModalProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered modal or null if not open.
 */
export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // Modal Overlay
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="إِغْلَاقُ"
          className="absolute top-4 right-4 bg-slate-100 text-slate-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-slate-200 transition-colors flex items-center justify-center group"
        >
          <IoMdClose className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:scale-110" />
        </button>

        <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-cyan-600">دَلِيلُ الْمُسَاعَدَةِ 💡</h2>
            <p className="text-lg sm:text-xl text-slate-500 mt-2">أَهْلًا بِكَ فِي مُغَامَرَةِ تَعَلُّمِ اللُّغَةِ الْعَرَبِيَّةِ!</p>
        </div>

        <div className="space-y-6 text-base sm:text-lg text-slate-700">
            <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-sky-600">📝 أَكْمِلِ الْحَرْفَ</h3>
                <p>سَتَرَى كَلِمَةً يَنْقُصُهَا حَرْفٌ. مُهِمَّتُكَ هِيَ اخْتِيَارُ الْحَرْفِ الصَّحِيحِ مِنَ الْخِيَارَاتِ لِتُصْبِحَ الْكَلِمَةُ كَامِلَةً.</p>
            </div>
            <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-emerald-600">📖 أَكْمِلِ الْجُمْلَةَ</h3>
                <p>تَحَدٍّ أَكْبَرُ! اِقْرَأِ الْجُمْلَةَ وَاخْتَرِ الْكَلِمَةَ الْمُنَاسِبَةَ لِتَضَعَهَا فِي الْفَرَاغِ وَيَكْتَمِلَ الْمَعْنَى.</p>
            </div>
            <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-amber-600">🃏 بِطَاقَاتُ الذَّاكِرَةِ</h3>
                <p>اِخْتَبِرْ قُوَّةَ ذَاكِرَتِكَ! اِقْلِبِ الْبِطَاقَاتِ وَحَاوِلْ أَنْ تَجِدَ كُلَّ كَلِمَتَيْنِ مُتَطَابِقَتَيْنِ.</p>
            </div>
            <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-rose-600">🧩 تَرْكِيبُ الْكَلِمَاتِ</h3>
                <p>هُنَا الْإِبْدَاعُ! سَتَجِدُ حُرُوفًا مُبَعْثَرَةً، وَعَلَيْكَ تَرْتِيبُهَا لِتُكَوِّنَ كَلِمَةً عَرَبِيَّةً صَحِيحَةً.</p>
            </div>
            <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-indigo-600">✍️ تَكْوِينُ الْجُمَلِ</h3>
                <p>بَعْدَ إِتْقَانِ الْكَلِمَاتِ، حَانَ وَقْتُ الْجُمَلِ! رَتِّبِ الْكَلِمَاتِ الْمُبَعْثَرَةَ لِتُكَوِّنَ جُمْلَةً مُفِيدَةً.</p>
            </div>
             <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-slate-800">📰 الْكَلِمَاتُ الْمُتَقَاطِعَةُ</h3>
                <p>لِلْأَبْطَالِ فَقَطْ! اِسْتَخْدِمِ الْأَلْغَازَ لِمَعْرِفَةِ الْكَلِمَاتِ الصَّحِيحَةِ وَامْلَأْ شَبَكَةَ الْحُرُوفِ.</p>
            </div>
             <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-yellow-500">⭐ النِّقَاطُ</h3>
                <p>مَعَ كُلِّ إِجَابَةٍ صَحِيحَةٍ، سَتَكْسِبُ نُقُوطًا تُضَافُ إِلَى رَصِيدِكَ. اِجْمَعْ أَكْبَرَ عَدَدٍ مِنَ النُّقُوطِ وَكُنْ بَطَلَ اللُّغَةِ الْعَرَبِيَّةِ!</p>
            </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-6 border-t-2 border-slate-200 text-center">
             <p className="text-slate-600 font-semibold">فكرة وتصميم: عبدالمالك بدوح - المغرب 🇲🇦</p>
             <a href="mailto:bdh.malek@gmail.com" className="text-slate-600 font-semibold hover:text-cyan-600 transition-colors">bdh.malek@gmail.com</a>
        </div>

      </div>
    </div>
  );
};