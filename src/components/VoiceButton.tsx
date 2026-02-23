import { Mic, MicOff } from 'lucide-react';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { useEffect } from 'react';

interface VoiceButtonProps {
  onResult: (text: string) => void;
  className?: string;
}

export default function VoiceButton({ onResult, className = '' }: VoiceButtonProps) {
  const { isListening, transcript, startListening, stopListening, isSupported } = useVoiceInput();

  useEffect(() => {
    if (!isListening && transcript) {
      onResult(transcript);
    }
  }, [isListening, transcript, onResult]);

  if (!isSupported) return null;

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
        isListening
          ? 'gradient-hero text-primary-foreground scale-110'
          : 'bg-primary/10 text-primary hover:bg-primary/20'
      } ${className}`}
      title={isListening ? 'बोलना बंद करें' : 'हिंदी में बोलें'}
    >
      {isListening && (
        <span className="absolute inset-0 rounded-full gradient-hero opacity-40 animate-pulse-ring" />
      )}
      {isListening ? <MicOff className="w-5 h-5 relative z-10" /> : <Mic className="w-5 h-5" />}
    </button>
  );
}
