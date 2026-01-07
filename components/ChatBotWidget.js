// components/ChatBotWidget.js

"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, ChevronsDown, ChevronsUp } from "lucide-react";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [theme, setTheme] = useState("light");
  const [iframeError, setIframeError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [size, setSize] = useState({ width: 320, height: 500 });

  const positionRef = useRef({ x: 20, y: 20 });
  const containerRef = useRef(null);
  const draggingRef = useRef(false);
  const resizingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ x: 0, y: 0, width: 320, height: 500 });

  const iframeUrl = `https://smart-india-hackathon-prototype-n8huzqj27etzt8x6bv9nns.streamlit.app/?embed=true&theme=${theme}`;

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowSize.width < 768;
  useEffect(() => setMinimized(isMobile), [isMobile]);

  // THEME DETECT
  useEffect(() => {
    if (!isClient) return;
    const detectTheme = () => {
      const darkMode =
        document.documentElement.classList.contains("dark") ||
        localStorage.getItem("theme") === "dark";
      setTheme(darkMode ? "dark" : "light");
    };
    detectTheme();
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [isClient]);

  // DRAGGING
  const startDrag = (clientX, clientY) => {
    draggingRef.current = true;
    offsetRef.current = {
      x: clientX - positionRef.current.x,
      y: clientY - positionRef.current.y,
    };
  };
  const onDragMove = (e) => {
    if (!draggingRef.current) return;
    let newX = e.clientX - offsetRef.current.x;
    let newY = e.clientY - offsetRef.current.y;
    newX = Math.max(0, Math.min(windowSize.width - size.width, newX));
    newY = Math.max(0, Math.min(windowSize.height - size.height, newY));
    if (containerRef.current) {
      containerRef.current.style.left = `${newX}px`;
      containerRef.current.style.top = `${newY}px`;
    }
  };
  const stopDrag = () => {
    draggingRef.current = false;
    if (containerRef.current) {
      positionRef.current = {
        x: parseInt(containerRef.current.style.left) || 20,
        y: parseInt(containerRef.current.style.top) || 20,
      };
    }
  };
  const onMouseDownHeader = (e) => !isMobile && startDrag(e.clientX, e.clientY);

  // RESIZING
  const startResize = (e) => {
    e.stopPropagation();
    resizingRef.current = true;
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    };
  };
  const onResizeMove = (e) => {
    if (!resizingRef.current) return;
    let newWidth =
      resizeStartRef.current.width + (e.clientX - resizeStartRef.current.x);
    let newHeight =
      resizeStartRef.current.height + (e.clientY - resizeStartRef.current.y);

    newWidth = Math.max(
      250,
      Math.min(windowSize.width - positionRef.current.x, newWidth)
    );
    newHeight = Math.max(
      350,
      Math.min(windowSize.height - positionRef.current.y, newHeight)
    );

    setSize({ width: newWidth, height: newHeight });
  };
  const stopResize = () => (resizingRef.current = false);

  useEffect(() => {
    const handleMouseUp = () => {
      stopDrag();
      stopResize();
    };
    window.addEventListener("mousemove", onDragMove);
    window.addEventListener("mousemove", onResizeMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", onDragMove);
      window.removeEventListener("mousemove", onResizeMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [size, windowSize]);

  if (!isClient) return null;

  const minimizedStyle = minimized
    ? {
        width: 60,
        height: 60,
        bottom: 12,
        right: 12,
        left: "auto",
        top: "auto",
      }
    : {
        width: size.width,
        height: size.height,
        left: positionRef.current.x ?? 20,
        top: positionRef.current.y ?? 20,
        bottom: "auto",
        right: "auto",
      };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-transform duration-300"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {open && (
        <div
          ref={containerRef}
          style={minimizedStyle}
          className={`fixed z-50 shadow-2xl rounded-xl overflow-hidden border border-neutral-700 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 transition-all duration-300 ease-in-out ${
            minimized
              ? "opacity-80 cursor-pointer hover:scale-105"
              : "opacity-100 cursor-default"
          }`}
          onClick={() => minimized && setMinimized(false)}
        >
          {/* Header */}
          <div
            className="flex justify-between items-center p-3 border-b border-neutral-200 dark:border-neutral-700 select-none cursor-move"
            onMouseDown={onMouseDownHeader}
          >
            <h3 className="font-semibold text-sm md:text-base text-neutral-900 dark:text-neutral-50">
              AI Chatbot
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMinimized(!minimized);
                }}
                className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                {minimized ? (
                  <ChevronsUp size={16} />
                ) : (
                  <ChevronsDown size={16} />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {!minimized && (
            <div
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              {!iframeError ? (
                <>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 animate-pulse z-40">
                      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                  <iframe
                    key={theme}
                    src={iframeUrl}
                    className="w-full h-full border-0"
                    title="AI Chatbot"
                    onLoad={() => setLoading(false)}
                    onError={() => setIframeError(true)}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 text-center p-4">
                  <p className="mb-4">
                    Unable to load chatbot. The external app may block
                    embedding.
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        iframeUrl,
                        "_blank",
                        "noopener,noreferrer,width=800,height=600"
                      );
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Open in New Tab
                  </button>
                </div>
              )}
              {/* Draggable Resize Handle */}
              <div
                onMouseDown={startResize}
                className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-50"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 50%, #3b82f6 50%)",
                  borderBottomLeftRadius: "4px",
                  boxShadow: "1px 1px 3px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
