import { useEffect, useState } from "react";

export function useFixedVoice() {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const updateVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find((v) =>
        /Google US English|Google UK English Female|Microsoft Aria.*Online|Samantha/.test(
          v.name
        )
      );
      setVoice(preferred || voices[0]);
    };

    window.speechSynthesis.onvoiceschanged = updateVoice;
    updateVoice();
  }, []);

  return voice;
}
