import { Circle, Rect, Stage, Layer, Text, Star, Image as KonvaImage, Transformer, Group } from 'react-konva';
import Konva from 'konva';
import { SyntheticEvent, useEffect, useImperativeHandle, useRef, useState } from 'react';
import useImage from 'use-image';

const Avatar = ({
    url = '',
    item = '',
    cRef,
}) => {

    const [image] = useImage(url);
    const [itemImage] = useImage(item);

    const imgRef = useRef(null);
    const trRef = useRef(null);
    const stageRef = useRef(null);

    const [star, setStar] = useState({
        x: 300,
        y: 300,
        scaleX: 1,
        scaleY: 1,
        rotation: 20,
        isDragging: false,
    })

    const handleDragStart = (element) => {
        console.log('element: ', element.target);

        element.target.moveToTop();

        trRef?.current?.nodes([element.target]);
        trRef?.current?.getLayer().batchDraw();

        setStar({
            ...star,
            isDragging: true,
        });

    }

    const handleDragEnd = (e: any) => {
        // trRef?.current?.nodes([null]);
        // trRef?.current?.getLayer().batchDraw();
        setStar({
            ...star,
            x: e.target.x(),
            y: e.target.y(),
            scaleX: e.target.scaleX(),
            scaleY: e.target.scaleY(),
            isDragging: false,
        });
        // trRef.current = null;
    }

    function downloadURI(uri: string, name: string) {
        var link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const exportToImage = () => {
        trRef?.current?.nodes([]);
        const dataURL = stageRef.current.toDataURL();
        console.log('stageRef', stageRef);
        downloadURI(dataURL, 'stage.png');
    };

    useEffect(() => {
        // trRef.current.nodes([imgRef.current]);
        // trRef.current.getLayer().batchDraw();
    }, []);

    useImperativeHandle(cRef, () => ({
        downloadImg: () => {
            exportToImage();
        }
    }));

    const setImageRef = (element) => {
        imgRef.current = element.target;
    }

    const handleClickOuter = () => {
        trRef?.current?.nodes([]);
    }

    console.log('item', item);
    console.log('itemImage', itemImage);

    return (
        <div className="">
            <Stage width={320} height={320} ref={stageRef}>
                <Layer onClick={handleClickOuter}>
                    <Group>
                        <KonvaImage image={image} />
                        {
                            item ? <KonvaImage
                                image={itemImage}
                                id="starid"
                                x={star.x}
                                y={star.y}
                                numPoints={5}
                                opacity={1}
                                draggable
                                rotation={star.rotation}
                                scaleX={star.isDragging ? star.scaleX : 1}
                                scaleY={star.isDragging ? star.scaleY : 1}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onClick={setImageRef}
                            /> : null
                        }
                    </Group>
                </Layer>
                <Layer>
                    <Transformer
                        ref={trRef}
                        boundBoxFunc={(oldBox, newBox) => {
                            // limit resize
                            console.log('oldBox:', oldBox);
                            console.log('newBox', newBox);
                            if (newBox.width < 5 || newBox.height < 5) {
                                return oldBox;
                            }
                            const { width, height } = newBox;
                            console.log('width', width);
                            console.log('height', height);
                            return newBox;
                        }}
                    />
                </Layer>
            </Stage>
        </div>
    );
}

export default Avatar
