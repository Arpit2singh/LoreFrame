import { useState, useEffect, useRef } from 'react';
import { useStudio } from '../context/StudioContext';
import { Sparkles, Send, History, Eraser, Keyboard, Zap, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import HistoryModal from "./HistoryModal";
import "./DirectorPanel.css";


function RollingText({
  text = "ROLLING TEXT",
  speed = 0.05,
  duration = 0.5,
  className,
}) {
  const letters = text.split("");
  const centerIndex = Math.floor(letters.length / 2);

  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <span className="sr-only">{text}</span>
      {letters.map((letter, i) => {
        const distance = Math.abs(i - centerIndex);
        const delay = distance * speed;

        return (
          <motion.span
            key={`${text}-${i}`} // Unique key ensures animation resets if text changes
            initial={{ y: "100%", opacity: 0, rotateX: 90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }} // Changed from whileInView to animate
            transition={{
              duration: duration,
              delay: delay,
              ease: [0.33, 1, 0.68, 1],
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="inline-block transform-style-3d origin-bottom"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        );
      })}
    </div>
  );
}

export default function DirectorPanel() {
  const {
    generateStoryboard,
    isGenerating,
    setPrompt, 
    prompt: globalPrompt, 
    userData,
    selectedCharacterId,
    Type ,
    setType ,
  } = useStudio();

  // Local state synced with global prompt
  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const textareaRef = useRef(null);

  // 🔄 Sync local input if global prompt changes 
  useEffect(() => {
    if (globalPrompt) setInput(globalPrompt);
  }, [globalPrompt]);

  // ⌨️ Handle Keyboard Shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const handleClear = () => {
    setInput("");
    setPrompt(""); // Clear global as well
    textareaRef.current?.focus();
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;

    if (!selectedCharacterId) {
      toast.error("Please select a character from the locker first!");
      return;
    }

    const selectedCharacter = userData.find(
      (char) => char.id === selectedCharacterId
    );

    if (!selectedCharacter) {
      toast.error("Selected character data not found.");
      return;
    }

    setPrompt(input);

    try {
      await generateStoryboard({
        prompt: input,
        character: selectedCharacter
      });
    } catch (error) {
      console.error("Generation failed:", error);
      toast.error("Failed to generate storyboard.");
    }
  };

  return (
    <div className="p-4 sm:p-6 border-t bg-[#111111] border-zinc-900 relative z-30">
      
      <div className="max-w-5xl mx-auto flex flex-col gap-2">
        
        {/* Input Container */}
        <div className="relative group flex gap-3 items-stretch bg-[#1C1C1E] border border-zinc-800 rounded-2xl p-2 backdrop-blur-xl shadow-2xl hover:border-zinc-700 transition-colors">
          
          {/* Icon Decorator */}
          <div className="absolute left-30 top-10 flex gap-5 text-blue-500 pointer-events-none">
            <Sparkles size={18} className={isGenerating ? "animate-pulse" : ""} />
            
          </div>
           <select className='bg-blue-400 outline-none cursor-pointer rounded-xl pl-4 pr-3' value={Type} onChange={(e) => setType(e.target.value === "true")}>
              <option value="true" className='bg-blue-400 outline-none cursor-pointer rounded-3xl p-2 ' >Image</option>
               <option value="false" className='bg-blue-400 outline-none cursor-pointer rounded-3xl p-2 '>Video</option>
            </select>
         
          
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setPrompt(e.target.value); 
            }}
            onKeyDown={handleKeyDown}
            disabled={isGenerating}
            placeholder={selectedCharacterId 
              ? "Script your scene... (e.g. standing in a rainy cyberpunk alleyway looking up)" 
              : "⚠️ Select a character to start scripting..."}
            className="flex-1 bg-transparent pl-10 pr-12 py-3 resize-none outline-none text-zinc-200 placeholder:text-zinc-600 text-sm h-16 custom-scrollbar transition-all focus:h-24"
          />

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 pr-2">
            
            {/* Clear Button */}
            {input && !isGenerating && (
              <button 
                onClick={handleClear}
                className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                title="Clear Script"
              >
                <Eraser size={18} />
              </button>
            )}

            {/* History Toggle */}
            <button
              onClick={() => setShowHistory(true)}
              className="p-3 rounded-xl bg-[#111111] text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all border border-zinc-800"
              title="View History"
            >
              <History size={18} />
            </button>

            {/* Generate Button with Animation */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !input.trim() || !selectedCharacterId}
              className="h-full px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/20 active:scale-95 flex items-center gap-2 overflow-hidden"
            >
              {isGenerating ? (
                <>
                  <Zap size={16} className="animate-bounce" />
                  <span className="hidden sm:inline">
                    <RollingText text="PROCESSING..." speed={0.05} />
                  </span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  {/* Changed color from text-amber-500 to text-white/inherit to ensure visibility */}
                  <span className="hidden sm:inline">
                    <RollingText text="GENERATE" speed={0.1} />
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center px-4 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
           <div className="flex items-center gap-2">
             <Keyboard size={12} />
             <span>Ctrl + Enter to Submit</span>
           </div>
           
           {/* Validation Warning - Animated */}
           {!selectedCharacterId && (
             <div className="flex items-center gap-1 text-amber-500">
               <AlertCircle size={12} className="animate-pulse" />
               <RollingText 
                 text="SELECT CHARACTER FIRST" 
                 speed={0.03} 
                 className="text-amber-500 font-bold"
               />
             </div>
           )}

           <div>{input.length} Chars</div>
        </div>

      </div>

      <HistoryModal
        open={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </div>
  );
}