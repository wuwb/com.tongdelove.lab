import React from 'react';
import * as qiniu from 'qiniu-js';
import Style from './index.less';
import { notification } from 'antd';
import { getToken } from '@/services/user';

class Upload extends React.Component {
  uploadFn = async () => {
    const response = await getToken();
    const { baseUrl, token } = response.data;
    const files = this.refs.upload.files;

    // 校验图片
    if (!this.imageVerify) return;

    const putExtra = {
      fname: '',
      params: {},
      mimeType: ['image/png', 'image/jpeg', 'image/gif'],
    };

    const config = {
      region: qiniu.region.z0,
    };

    // 文件名
    const key = new Date().getTime() + files[0].name;
    const observable = qiniu.upload(files[0], key, token, putExtra, config);

    const observer = {
      next: (res) => {
        // ...
      },
      error: (err) => {
        notification.error({
          message: err,
        });
      },
      complete: (res) => {
        const imgUrl = baseUrl + '/' + res.key;
        this.props.successCb(imgUrl);
      },
    };

    const subscription = observable.subscribe(observer); // 上传开始
  };

  imageVerify = () => {
    const files = this.refs.upload.files;
    const fileType = files[0].type;
    if (/^image/.test(fileType)) {
      // 读取结果在fileReader.result里面
      return true;
    } else {
      notification.error({
        message: '请选择图片类型文件',
      });
      return false;
    }
  };

  render() {
    return (
      <input ref="upload" className={Style['upload-image']} type="file" onChange={this.uploadFn} />
    );
  }
}

Upload.defaultProps = {
  successCb: () => { },
};

export default Upload;
