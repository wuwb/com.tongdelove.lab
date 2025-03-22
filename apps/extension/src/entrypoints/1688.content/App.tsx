import { REPLACE_BEARER_TOKEN, SUPPLY_TABLE_KEY, TEABLE_ROOT } from '@/constants/app';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [spanValue, setSpanValue] = useState<string | null>(null);
  const longLivedMessageList = useRef<HTMLUListElement>(null)

  const [helloResponsePre, sethelloResponsePre] = useState('Waiting for message to be sent...')
  const [unknownResponsePre, setunknownResponsePre] = useState('Waiting for message to be sent...')

  const sendHelloMessageBtn = async () => {
    try {
      const response = await browser.runtime.sendMessage({
        type: "hello",
        name: "Aaron",
      });
      console.log({ response });
      console.log('response: ', response)
      sethelloResponsePre(JSON.stringify(response));
    } catch (err: any) {
      sethelloResponsePre("ERROR: " + err.message);
    }
  }

  const sendUnknownMessageBtn = async () => {
    try {
      const response = await browser.runtime.sendMessage({ type: "unknown" });
      console.log({ response });
      console.log('response: ', response)

      setunknownResponsePre(JSON.stringify(response));
    } catch (err: any) {
      setunknownResponsePre("ERROR: " + err.message);
    }
  }

  const handleCollect = async () => {

    // https://sale.1688.com/factory/
    console.log('path: ', window.location.href)


    const url = new URL(`${TEABLE_ROOT}/api/table/${SUPPLY_TABLE_KEY}/record`);
    const data = {
      "fieldKeyType": "id",
      "typecast": true,
      "order": {
        "viewId": "string",
        "anchorId": "string",
        "position": "before"
      },
      "records": [
        {
          "fields": {
            "联系人": "何新",
            "产品": [
              "自发热包"
            ],
            "地址": "江西省宜春市万载县株潭镇株山村",
            "备注": "（透明袋）物流/包专票",
            "联系电话": "13065173936",
            "供应商名称": "万载县易蒸科技有限公司",
          }
        }
      ]
    }
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${REPLACE_BEARER_TOKEN}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const port = browser.runtime.connect();
    port.onMessage.addListener((message) => {
      console.log('on message: ', message)
      const li = document.createElement("li");
      li.textContent = JSON.stringify(message);
      longLivedMessageList.current?.append(li);
    });
  }, [])

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
      // detail-page
      document.querySelector('.od-pc-offer-toolbar-wrapper')?.remove()
      document.querySelector('.gyp-pc-od-middle-banner')?.remove()
      document.querySelector('.od-pc-offer-combi-recommend')?.remove()
      // 同行还在看
      document.querySelector('.od-pc-offer-recommend')?.remove()
      // 声明内容
      document.querySelector('.od-pc-content-statement')?.remove()
      // 页脚
      document.querySelector('.od-pc-buyer-guarantee')?.remove()

      // https://cart.1688.com/cart.htm
      // 推荐货源模块
      document.querySelector('.ctf-lib-recommend')?.parentElement?.remove()
    }

    cleanDoms()
  }, []);

  return (
    <div className="w-[300px] fixed right-0 bottom-0 z-[101] border-l-2" style={{
      background: 'rgba(255,255,255, 0.8)',
    }}>
      <div>

        <div onClick={handleCollect}>采集</div>
      </div>
      <p>{spanValue}</p>
      <div>
        <div>
          <h2>One-time Message</h2>
          <button className="text-right" onClick={sendHelloMessageBtn}>Send "Hello" Message</button>
          <pre>{helloResponsePre}</pre>
          <button className="text-right" onClick={sendUnknownMessageBtn}>Send Unknown Message</button>
          <pre>{unknownResponsePre}</pre>
        </div>
        <div>
          <h2>Long-lived Messages</h2>
          <ul id="longLivedMessageList" ref={longLivedMessageList}></ul>
        </div>
      </div>
    </div>
  );
};

export default App
