// import { createContext, useState } from "react";
// import main from "../config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {

//   const [input,setInput]=useState("");
//   const [recentPrompt,setRecentPrompt]=useState("");
//   const [prevPrompts,setPrevPrompts]=useState([]);
//   const [showResult,setShowResult]=useState(false);
//   const [loading,setLoading]=useState(false);
//   const [resultData,setResultData]=useState("");


//   const delayPara=(index,nextWord)=>{
//     setTimeout(function(){
//         setResultData(prev=>prev+nextWord);
//     },75*index)

//   }

//   const onSent = async (prompt) => {
//     try {
//       setResultData("")
//       setLoading(true)
//       setShowResult(true)
//       setRecentPrompt(input)
//       setPrevPrompts(prev=>[...prev,input])
//       const response= await main(input);
//       let responseArray=response.split("**");
//       let newResponse = "";
//       for(let i=0;i<responseArray.length;i++){
//         if(i==0 || i%2!==1){
//             newResponse+=responseArray[i];
//         }
//         else{
//             newResponse+="<b>"+responseArray[i]+"</b>";
//         }
//       }
//       let newResponse2=newResponse.split("*").join("</br>")
//       let newResponseArray=newResponse2.split(" ");

//       for(let i=0;i<newResponseArray.length;i++){

//         const nextWord=newResponseArray[i];
//         delayPara(i,nextWord+" ");
//       }

//     //   setResultData(newResponse2)

//       setLoading(false)
//       setInput("")

//       console.log("✅ Gemini Response:", response);
//     } catch (error) {
//       console.error("❌ Gemini API Error:", error);
//     }
//     // await main(input);
//   };

  

//   const contextValue = {
//     // export onSent later if needed in UI
//     prevPrompts,
//     setPrevPrompts,
//     onSent,
//     setRecentPrompt,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;






// import { createContext, useState } from "react";
// import main from "../config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [prevPrompts, setPrevPrompts] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resultData, setResultData] = useState("");

//   const delayPara = (index, nextWord) => {
//     setTimeout(() => {
//       setResultData((prev) => prev + nextWord);
//     }, 50 * index); // Typing speed
//   };

//   const onSent = async () => {
//     try {
//       setResultData("");
//       setLoading(true);
//       setShowResult(true);
//       setRecentPrompt(input);
//       setPrevPrompts((prev) => [...prev, input]);

//       const response = await main(input);

//       // Preserve line breaks with <br>
//       const responseWithBr = response.replace(/\n/g, "<br>");
//       const words = responseWithBr.split(" ");

//       words.forEach((word, i) => {
//         delayPara(i, word + " ");
//       });

//       setLoading(false);
//       setInput("");
//       console.log("✅ Gemini Response:", response);
//     } catch (error) {
//       console.error("❌ Gemini API Error:", error);
//       setLoading(false);
//     }
//   };

//   const contextValue = {
//     prevPrompts,
//     setPrevPrompts,
//     onSent,
//     setRecentPrompt,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput,
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;







// import { createContext, useState } from "react";
// import main from "../config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [prevPrompts, setPrevPrompts] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resultData, setResultData] = useState("");


//  const newChat=() =>{
//     setLoading(false)
//     setShowResult(false)
//  }


//   const onSent = async (customPrompt) => {
//   try {
//     setResultData("");
//     setLoading(true);
//     setShowResult(true);

//     const promptToSend = customPrompt || input;

//     setRecentPrompt(promptToSend);
//     setPrevPrompts((prev) => [...prev, promptToSend]);

//     const response = await main(promptToSend);
//     setResultData(response); // show full response instantly 🚀

//     if (!customPrompt) setInput("");
//   } catch (error) {
//     console.error("❌ Gemini API Error:", error);
//   } finally {
//     setLoading(false);
//   }
// };


// //   const onSent = async (customPrompt) => {
// //   try {
// //     setResultData("");
// //     setLoading(true);
// //     setShowResult(true);

// //     const promptToSend = customPrompt || input;

// //     setRecentPrompt(promptToSend);
// //     setPrevPrompts((prev) => [...prev, promptToSend]);

// //     const response = await main(promptToSend); // plain text from Gemini

// //     const words = response.split(" "); // split by words
// //     let displayText = "";

// //     for (let i = 0; i < words.length; i++) {
// //       displayText += words[i] + " ";

// //       // simulate typing every 10ms (very fast)
// //       await new Promise((res) => setTimeout(res, 10));
// //       setResultData(displayText);
// //     }

// //     if (!customPrompt) setInput(""); // clear input if not a history click
// //   } catch (error) {
// //     console.error("❌ Gemini API Error:", error);
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// //   const onSent = async (customPrompt) => {
// //   try {
// //     setResultData("");
// //     setLoading(true);
// //     setShowResult(true);

// //     const promptToSend = customPrompt || input;

// //     setRecentPrompt(promptToSend);
// //     setPrevPrompts((prev) => [...prev, promptToSend]);

// //     const response = await main(promptToSend);
// //     setResultData(response);
// //     if (!customPrompt) setInput(""); // clear input only if user typed new
// //   } catch (error) {
// //     console.error("❌ Gemini API Error:", error);
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// //   const onSent = async () => {
// //     try {
// //       setResultData("");
// //       setLoading(true);
// //       setShowResult(true);
// //       setRecentPrompt(input);
// //       setPrevPrompts((prev) => [...prev, input]);

// //       const response = await main(input); // this should return plain markdown text
// //       setResultData(response); // set as it is — no bold or split/replace
// //       setInput("");
// //     } catch (error) {
// //       console.error("❌ Gemini API Error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

//   const contextValue = {
//     prevPrompts,
//     setPrevPrompts,
//     onSent,
//     setRecentPrompt,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput,
//     newChat
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;






// import { createContext, useEffect, useState } from "react";
// import main from "../config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [prevPrompts, setPrevPrompts] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resultData, setResultData] = useState("");

//   const [tone, setTone] = useState("normal"); // 🆕 tone selection

//   const [darkMode, setDarkMode] = useState(() => {
//     const stored = localStorage.getItem("darkMode");
//     return stored ? JSON.parse(stored) : false;
//   });

//   useEffect(() => {
//     localStorage.setItem("darkMode", JSON.stringify(darkMode));
//     document.body.className = darkMode ? "dark" : "";
//   }, [darkMode]);

//   const toggleDarkMode = () => setDarkMode((prev) => !prev);

//   const newChat = () => {
//     setLoading(false);
//     setShowResult(false);
//   };

//   const onSent = async (customPrompt) => {
//     try {
//       setResultData("");
//       setLoading(true);
//       setShowResult(true);

//       const promptToSend = customPrompt || input;

//       const modifiedPrompt =
//         tone === "normal"
//           ? promptToSend
//           : `Respond in a ${tone} tone: ${promptToSend}`;

//       setRecentPrompt(promptToSend);
//       setPrevPrompts((prev) => [...prev, promptToSend]);

//       const response = await main(modifiedPrompt);
//       setResultData(response);

//       if (!customPrompt) setInput("");
//     } catch (error) {
//       console.error("❌ Gemini API Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const contextValue = {
//     prevPrompts,
//     setPrevPrompts,
//     onSent,
//     setRecentPrompt,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput,
//     newChat,
//     darkMode,
//     toggleDarkMode,
//     tone,
//     setTone, // 🆕
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;





import { createContext, useEffect, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const [tone, setTone] = useState("normal"); // 🆕 tone selection

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    // When starting a new chat, also reset resultData to clear previous streamed content
    setResultData("");
  };

  const onSent = async (customPrompt) => {
    setResultData(""); // Clear previous result immediately
    setLoading(true);
    setShowResult(true);

    const promptToSend = customPrompt || input;

    // Use selectedTone from Main.jsx or ensure tone state is correctly managed here
    // If selectedTone in Main.jsx is controlled by this Context, we can use the 'tone' state here.
    // Assuming 'tone' state correctly reflects the selected value from the dropdown.
    const modifiedPrompt =
      tone === "" || tone === "Default" || tone === "normal"
        ? promptToSend
        : `Respond in a ${tone} tone: ${promptToSend}`;

    setRecentPrompt(promptToSend);
    setPrevPrompts((prev) => [...prev, promptToSend]);

    try {
      const response = await main(modifiedPrompt); // Fetch the full response
      let responseArray = response.split("**"); // Split by bold markdown
      let newResponse = "";

      // Simulate streaming:
      // Loop through parts of the response and gradually update resultData
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) { // Regular text
          newResponse += responseArray[i];
        } else { // Bold text
          newResponse += "**" + responseArray[i] + "**";
        }
        // Use a small delay for each chunk
        await new Promise(resolve => setTimeout(resolve, 50)); // Adjust delay as needed (e.g., 50ms)
        setResultData(newResponse); // Update the state with the current chunk
      }

      // If you also want to stream parts separated by '*' for italics, you'd add another loop or refine the splitting
      // For now, let's just consider the bold parts or split by individual characters

    } catch (error) {
      console.error("❌ Gemini API Error:", error);
      // Display an error message to the user if the API call fails
      setResultData("Apologies, I encountered an error. Please try again.");
    } finally {
      setLoading(false);
      setInput(""); // Clear input after sending
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    darkMode,
    toggleDarkMode,
    tone,
    setTone, // This is crucial to update the tone state from Main.jsx
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
