import { useContext, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { assets } from '../../../asset/assets';
import { Context } from '../../context/Context';
import './Main.css';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    toggleDarkMode,
    darkMode,
  } = useContext(Context);

  // Set the initial state to an empty string or null, or 'Default' if you want a default active tone
  // If you want 'Default' to be the active tone when nothing is selected, keep it as 'Default'.
  // If you want nothing to be "selected" visually until a user picks, use '' or null.
  const [selectedTone, setSelectedTone] = useState(''); // Changed initial state

  const [speaking, setSpeaking] = useState(false);

  const handleMicClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setInput((prevInput) => prevInput + ' ' + speechToText);
    };

    recognition.onerror = (event) => {
      alert('Error occurred in speech recognition: ' + event.error);
    };
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-Speech is not supported in this browser.');
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(resultData);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resultData);
    alert('Copied to clipboard!');
  };

  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <select
            className='tone-select'
            value={selectedTone}
            onChange={(e) => setSelectedTone(e.target.value)}
            style={{
              backgroundColor: darkMode ? '#2a2b38' : '#f0f4f9',
              color: darkMode ? '#f1f1f1' : '#585858',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '14px',
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none',
              backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="${darkMode ? 'white' : '#585858'}" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center',
              backgroundSize: '16px',
            }}
          >
            {/* This is the heading/placeholder option */}
            <option value='' disabled>✨ Select Tone</option>
            <option value='Formal'>🎯 Formal</option>
            <option value='Simple'>💬 Simple</option>
            <option value='Friendly'>😊 Friendly</option>
            <option value='Technical'>🧠 Technical</option>
          </select>

          <button onClick={toggleDarkMode} className='toggle-btn'>
            {darkMode ? '🌞' : '🌙'}
          </button>
          <img className='profile-pic' src={assets.user_icon} alt='' />
        </div>
      </div>

      <div className='main-container'>
        {!showResult ? (
          <>
            <div className='greet'>
              <p><span>Hello, Raj.</span></p>
              <p>How can I help you today</p>
            </div>
            <div className='cards'>
              <div className='card'><p>Suggest beautiful places to see on an upcoming road trip</p><img className='icon' src={assets.compass_icon} alt='' /></div>
              <div className='card'><p>Briefly summarize this concept: urban planning</p><img className='icon' src={assets.bulb_icon} alt='' /></div>
              <div className='card'><p>Brainstorm team bonding activities for our work retreat</p><img className='icon' src={assets.message_icon} alt='' /></div>
              <div className='card'><p>Improve the readability of the following code</p><img className='icon' src={assets.code_icon} alt='' /></div>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className='result-title'>
              <img className='profile-pic' src={assets.user_icon} alt='' />
              <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
              <img className='gemini-icon' src={assets.gemini_icon} alt='' />
              {loading ? (
                <div className='loader'><hr /><hr /><hr /></div>
              ) : (
                <div className='markdown-container'>
                  <div className='toolbar-select' style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '10px' }}>
                     <button className='copy-btn' onClick={handleCopy}>📋 Copy</button>
                  </div>
                  <div className='markdown-output'>
                    <ReactMarkdown>{resultData}</ReactMarkdown>
                  </div>

                  <div className='voice-controls'>
                    <button className='voice-btn' onClick={handleSpeak}>🔊 Listen Response</button>
                    <button className='stop-btn' onClick={handleStopSpeaking}>🔇 Stop</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className='main-bottom'>
          <div className='search-box'>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type='text'
              placeholder='Enter a prompt here'
            />
            <div>
              <img className='icon' src={assets.gallery_icon} alt='' />
              <img
                className='icon'
                src={assets.mic_icon}
                alt='mic'
                onClick={handleMicClick}
                style={{ cursor: 'pointer' }}
              />
              {input && (
                <img
                  className='send-icon'
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt='send'
                />
              )}
            </div>
          </div>

          <p className='bottom-info'>
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;