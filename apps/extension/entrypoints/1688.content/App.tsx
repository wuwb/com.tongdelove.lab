import React, { useEffect, useState } from 'react';

const App = () => {
  const [spanValue, setSpanValue] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpanValue = () => {
      const container = document.getElementById('hd_0_container_0');
      if (container) {
        const firstSpan = container.querySelector('span');
        if (firstSpan) {
          setSpanValue(firstSpan.textContent);
        }
      }
    };

    fetchSpanValue();


    const cleanDoms = () => {
      document.querySelector('.od-pc-offer-toolbar-wrapper')?.remove()
      document.querySelector('.gyp-pc-od-middle-banner')?.remove()
      document.querySelector('.od-pc-offer-combi-recommend')?.remove()

      // 同行还在看
      document.querySelector('.od-pc-offer-recommend')?.remove()

      // 声明内容
      document.querySelector('.od-pc-content-statement')?.remove()

      // 页脚
      document.querySelector('.od-pc-buyer-guarantee')?.remove()
    }

    cleanDoms()
  }, []);

  return (
    <div className="w-[300px] h-full fixed right-0 bottom-0 z-[101] border-l-2" style={{
      background: 'rgba(255,255,255, 0.8)',
    }}>
      <p>{spanValue}</p>
    </div>
  );
};

export default App
