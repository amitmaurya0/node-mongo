import modules from './modules';

export default function (app: { use: (arg0: string, arg1: any) => void }) {
  app.use('/api/v1/', modules);
}
