import { Box, IconButton, Text } from '@pancakeswap/uikit'
import { ChangeEvent, useEffect, useState } from 'react';
import styled from "styled-components"
import Image from 'next/image'


/**
 * file to Base64 string
 * @param {File} file
 * @returns Base64
 */
export function FileToBase64(file: File) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
            resolve(e.target.result);
        };
    });
}

const Upload = styled(Box)`
    width: 98px;
    height: 98px;
    border-radius: 8px;
    cursor: pointer;
    border: 2px var(--colors-inputSecondary) dashed;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--colors-inputSecondary);
`

const Close = styled(IconButton)`
    background-color: red;
    font-size: 18px;
    height: 20px;
    width: 20px;
    position:  absolute;
    right: -10px;
    top: -10px;
`

type UploadImageProps = {
    label?: string;
    maxSize?: number; // default 2MB
    required?: boolean;
    onChanged?: (file: File | undefined, fileData: string | undefined) => void;
} & React.HTMLAttributes<HTMLElement>;

const UploadImage = ({
    label = 'Logo',
    required = true,
    maxSize = 2 * 1024 * 1024,
    onChanged,
}: UploadImageProps) => {
    const [url, setUrl] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        setError(undefined);
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.includes('image')) {
                if (file.size > maxSize) {
                    setError('File is over 2 MB.');
                    return;
                }
                const result = (await FileToBase64(file)) as string;
                setUrl(result);
                onChanged?.(file, result);
            } else {
                setError('File not images.');
            }
        }
    };
    useEffect(() => {
        if (required && !url) {
            setError('File must upload.');
        } else {
            setError(undefined);
        }
    }, [required, url]);
    const clearFile = (e: MouseEvent) => {
        e.preventDefault();
        setUrl(undefined);
        onChanged?.(undefined, undefined);
    };

    const Preview = () => {
        return (
            <Box width="98px" height="98px" position="relative" borderRadius="8px">
                <Image sizes="98px" fill alt="upload image" src={url} />
                <Close scale="sm" onClick={clearFile as any}>
                    ×
                </Close>
            </Box>
        )
    }
    const UpInput = () => {
        return (
            <>
                <input type="file" id="submit-token-up-logo" onChange={onChange} style={{ display: "none" }} />
                <Upload>
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
                        <path d="M832 490.666667H533.333333V194.133333c0-12.8-8.533333-21.333333-21.333333-21.333333s-21.333333 8.533333-21.333333 21.333333V490.666667l-298.666667-2.133334c-12.8 0-21.333333 8.533333-21.333333 21.333334s8.533333 21.333333 21.333333 21.333333l298.666667 2.133333v298.666667c0 12.8 8.533333 21.333333 21.333333 21.333333s21.333333-8.533333 21.333333-21.333333V533.333333h298.666667c12.8 0 21.333333-8.533333 21.333333-21.333333 0-10.666667-10.666667-21.333333-21.333333-21.333333z" fill="currentColor" />
                    </svg>
                </Upload>
            </>
        )
    }
    return (
        <label htmlFor="submit-token-up-logo">
            <Text marginBottom="8px">{label} <span style={{color:'red'}}>{error && error}</span></Text>
            {url ? <Preview /> : <UpInput/>}
        </label>
    )
}

export default UploadImage;