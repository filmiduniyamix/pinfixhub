import React from 'react';

export default function SmartDescription({ text }) {
  // Split by spaces but preserve them to maintain formatting
  const words = text.split(/(\s+)/);
  const links = [];

  const formattedText = words.map((word, index) => {
    if (word.match(/^https?:\/\//)) {
      links.push(word);
      return (
        <a key={index} href={word} target="_blank" rel="noopener noreferrer" className="text-pink-500 font-semibold hover:underline break-all">
          {word}
        </a>
      );
    }
    if (word.startsWith('#') && word.length > 1) {
      return <span key={index} className="text-blue-500 font-medium">{word}</span>;
    }
    return word;
  });

  return (
    <div className="space-y-6">
      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{formattedText}</p>
      
      {/* Auto-extracted links converted to Beat Animation Buttons */}
      {links.length > 0 && (
        <div className="flex flex-col gap-3 mt-6">
          {links.map((link, i) => (
            <a 
              key={i} 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:animate-beat active:scale-95"
            >
               🔗 Visit External Link {links.length > 1 ? i + 1 : ''}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
