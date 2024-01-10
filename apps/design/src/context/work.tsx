import { createContext, useContext, useState } from 'react'

const initDesignData = window.localStorage.getItem('designData') || '[]';
const initInsideDesignData = window.localStorage.getItem('insideDesignData') || '[]';

const WorkContext = createContext(undefined)

export function WorkProvider({ children }) {
    const [work, setWork] = useState({
        isMouseDown: false,
        mouseDownElementStyle: {
            top: 0,
            left: 0,
            width: 0,
            height: 0,
        },
        mouseDownPosition: {
            x: 0,
            y: 0,
        },
        mouseMoveType: 'move',

        flip: true,

        title: '',
        projectName: '',

        rotate: 0,

        // 每次操作将数据存储到 localstorage
        designData: JSON.parse(initDesignData),
        currentDesignData: null,
        insideDesignData: JSON.parse(initInsideDesignData),
        currentInsideDesignData: null,

        lineGuides: [
            {
                "type": "x",
                "x": 0,
                "y": 65.08750403644837
            },
            {
                "type": "y",
                "x": 239.44792473826578,
                "y": 0
            },
            {
                "type": "y",
                "x": 239.44791666382324,
                "y": 0
            },
            {
                "type": "x",
                "x": 0,
                "y": 84.13749798039024
            }
        ],
    });
    return (
        <WorkContext.Provider
            value={{
                work,
                setWork,
            }}
        >
            {children}
        </WorkContext.Provider>
    );
}

export function usePokemon() {
    const context = useContext(WorkContext)

    if (!context)
        throw new Error('usePokemon must be used inside a `PokemonProvider`')

    return context
}


export default model<any>('work').define({
    actions: {
        archive(draft, payload) {
            const target = draft.items.find(item => item.email === payload)!;
            if (target) {
                target.archived = true;
            }
        },

        setFlipTrue() {
            state.flip = true;
        },
        setFlipFalse() {
            state.flip = false;
        },
        toggleFlip(state) {
            state.flip = !state.flip;
        },
        // 添加模块
        addDesignData(state, payload) {
            const designData = [...state.designData, payload];
            return {
                ...state,
                designData,
                currentDesignData: payload,
            }
        },
        // 添加模块
        addFontDesignData(state, { payload: type }) {
            let fontStyle;
            let fontWeight;

            if (type === 'text') {
                fontStyle = 'normal';
                fontWeight = 'normal';
            } else if (type === 'subtitle') {
                fontStyle = 'normal';
                fontWeight = 'bold';
            } else if (type === 'title') {
                fontStyle = 'normal';
                fontWeight = 'bold';
            }
            const designData = {
                uuid: uuidv4(), // "2b651ab1-a1f6-40ba-ba46-7a67bb2cae39", // id
                type: "font",
                src: "https://cdn.baoxiaohe.com/5225a97f-55e0-495f-a65e-ad2ad498e7a3.otf",
                value: "双击修改文字",
                example: "思源黑体-常规",
                id: 99066,
                style: {
                    position: "absolute",
                    lineHeight: 26.670000006,
                    fontSize: 22.225000005,
                    width: 143.35000003,
                    height: 26.670000006,
                    textAlign: "center",
                    fontFamily: "f99066",
                    rotate: 360,
                    color: "rgba(0,0,0,1)",
                    fontWeight: "bold",
                    fontStyle: "normal",
                    vertical: 0,
                    left: 286,
                    top: 295,
                    craft: 0,
                    lengthLock: false,
                    rotateX: false,
                    rotateY: false
                },
                _selected: true,
                _loaded: false,
                locked: false,
                _editing: false,
                _level: 1
            };
            const data = {
                ...state,
                designData: [...state.designData, designData],
                currentDesignData: designData,
            };
            return data;
        },
        // 添加文字模块
        updateDesignData(state, payload) {
            const designData = state.designData.map(item => {
                if (item.uuid === payload.uuid) {
                    return payload;
                }
                return { ...item };
            });
            return {
                ...state,
                designData,
                currentDesignData: payload,
            }
        },
        deleteDesignData(state, payload) {
            const { uuid } = payload;
            const designData = state.designData.filter(item => item.uuid !== uuid);
            return {
                ...state,
                designData,
                currentDesignData: null,
            }
        },
        keyboardDeleteDesignData(state) {
            if (state.currentDesignData) {
                const { uuid } = state.currentDesignData;
                const designData = state.designData.filter(item => item.uuid !== uuid);
                return {
                    ...state,
                    designData,
                    currentDesignData: null,
                }
            }
            return state;
        },

        setMouseUp(state) {
            state.isMouseDown = false;
        },
        setMouseDown(state) {
            state.isMouseDown = true;
        },
        setMouseDownPosition(state, payload) {
            state.mouseDownPosition = payload;
        },
        setMouseDownElementStyle(state, payload) {
            if (!state.currentDesignData) {
                return;
            }
            state.mouseDownElementStyle = {
                ...payload
            };
        },
        setMouseMoveType(state, payload) {
            state.mouseMoveType = payload;
        },

        // 选中模块
        selectDesignData(state, payload) {
            const { uuid } = payload;
            const designData = state.designData.map((item) => {
                if (item.uuid === uuid) {
                    return { ...item, _selected: true };
                }
                return { ...item };
            });
            const filtered = designData.filter(item => item.uuid === uuid)[0];
            return {
                ...state,
                designData,
                currentDesignData: filtered,
            };
        },
        cancelSelectDesignData(state, payload) {
            const { uuid } = payload;
            const designData = state.designData.map((item) => {
                if (item.uuid === uuid) {
                    return { ...item, _selected: false };
                }
                return { ...item };
            });
            const filtered = designData.filter(item => item.uuid === uuid)[0];
            return {
                ...state,
                isMouseDown: false,
                designData,
                currentDesignData: filtered,
            };
        },

        // 旋转
        // 放大
        // 缩小

        load: {
            pending(draft) {
                draft.pending = true;
            },
            rejected(draft, payload) {
                draft.pending = false;
                draft.error = payload;
            },
            fulfilled(draft, p) {
                draft.items = p;
            },
        },
    },
    effects: {
        async load() {
            const data = {};
            return data;
        },
    },
});
