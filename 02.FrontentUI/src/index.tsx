import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import 'pretendard/dist/web/static/pretendard.css';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { customizeTheme } from './styles/theme';
import { customKorean } from './config/locale.config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ConfigProvider theme={customizeTheme} locale={customKorean}>
      <RouterProvider router={router} />
    </ConfigProvider>
);

reportWebVitals();
