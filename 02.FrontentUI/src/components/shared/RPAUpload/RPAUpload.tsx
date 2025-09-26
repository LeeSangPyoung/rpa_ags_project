import React, { useState } from 'react';
import { Upload, Input, Button } from 'antd';
import { FileIcon } from '../RPAIcons';
import { UploadComponentProps } from './RPAUpload.types';

export const RPAUpload = ({value, onChange}: UploadComponentProps) => {
  const [fileName, setFileName] = useState<string>('');

  const props = {
    beforeUpload: (file:any) => {
      setFileName(file.name);
      if(onChange) {
        onChange(file.name)
      }
      return false; 
    },
    showUploadList: false,
    multiple: false,
  };

  return (
    <Upload {...props}>
      <Input
        prefix={<FileIcon />}
        placeholder={fileName || 'Upload file'}
        readOnly
        addonAfter={<Button className='bg-transparent text-white' type='text'>Upload</Button>}
      />
    </Upload>
  );
};

