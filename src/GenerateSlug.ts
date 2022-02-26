import { fabric } from 'fabric';
import {
    SlugAttributes,
    Attribute,
    Trait,
} from './Types';
import { pickRandomItem } from './Utilities';

const layerMapping = new Map([
    ['Background', { zIndex: 0 }],
    ['Slug', { zIndex: 1 }],
    ['Chest', { zIndex: 2 }],
    ['Mouth', { zIndex: 3 }],
    ['Back', { zIndex: 7 }],
    ['Head', { zIndex: 4 }],
    ['Eyes', { zIndex: 5 }],
    ['Tail', { zIndex: 6 }],
    ['Hands', { zIndex: 8 }],
]);

const downloadedImageMap = new Map<string, fabric.Image>();

async function getImageData(url: string, canvasSize: number): Promise<fabric.Image> {
    const prefetched = downloadedImageMap.get(url);

    if (prefetched !== undefined) {
        const height = prefetched.height as number;
        const scale = prefetched.scaleY as number;

        if (height * scale !== canvasSize) {
            prefetched.scaleToHeight(canvasSize);
            prefetched.scaleToWidth(canvasSize);
        }

        return prefetched;
    }

    const res = await fetch(url);
    const blob = await res.blob();

    return new Promise((res, rej) => {
        const htmlImage = document.createElement('img');

        htmlImage.addEventListener('load', () => {
            const fabricImage = new fabric.Image(htmlImage);

            fabricImage.scaleToHeight(canvasSize);
            fabricImage.scaleToWidth(canvasSize);

            downloadedImageMap.set(url, fabricImage);

            res(fabricImage);
        });

        htmlImage.src = URL.createObjectURL(blob);
    });
}

export async function renderSlug(
    slugTraits: SlugAttributes[],
    traitNameMap: Map<string, Trait>,
    canvasSize: number = 512): Promise<string> {

    /* Random string to avoid issues with multiple canvases with same ID */
    const domID = (Math.random() + 1).toString(36).substring(7);

    const htmlCanvas = document.createElement('canvas');
    htmlCanvas.id = domID;

    const canvas = new fabric.StaticCanvas(domID, {
        width: canvasSize,
        height: canvasSize,
    });

    const images: { image: string, zIndex: number }[] = [];

    for (const trait of slugTraits) {
        const { zIndex } = layerMapping.get(trait.trait_type)!;
        const { image } = traitNameMap.get(`${trait.trait_type}-${trait.value}`)!;

        images.push({
            zIndex,
            image,
        });
    }

    const imageData = [];

    for (const image of images.sort((a, b) => a.zIndex - b.zIndex)) {
        imageData.push(getImageData(image.image, canvasSize));
    }

    const renderData: fabric.Image[] = await Promise.all(imageData);

    for (const image of renderData) {
        canvas.add(image);
    }

    canvas.renderAll();

    return canvas.toDataURL({
        format: 'png',
    });
}

export function generatePreviewTraits(attributes: SlugAttributes) {
    const {
        trait_type,
        value,
    } = attributes;

    const items: SlugAttributes[] = [];

    if (value !== 'None') {
        items.push({
            trait_type,
            value,
        });
    }

    if (trait_type === 'Background') {
        return items;
    }

    items.push({
        trait_type: 'Background',
        value: 'Lake',
    });
    
    if (trait_type !== 'Slug') {
        items.push({
            trait_type: 'Slug',
            value: 'Green',
        });
    }

    if (trait_type !== 'Mouth') {
        items.push({
            trait_type: 'Mouth',
            value: 'Default',
        });
    }

    if (trait_type !== 'Eyes') {
        items.push({
            trait_type: 'Eyes',
            value: 'Default',
        });
    }

    return items;
}

export function pickRandomTrait(attribute: string, attributes: Attribute[]): Trait {
    for (const attr of attributes) {
        if (attr.name === attribute) {
            return pickRandomItem(attr.values);
        }
    }

    throw new Error(`Invalid attribute ${attribute} given!`);
}
