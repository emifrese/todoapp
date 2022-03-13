import todobg from '../assets/todobg.jpg'

const Layout = (props) => (
  <div className=" flex h-screen justify-around flex-wrap overflow-hidden relative content-between">
    <img src={todobg} alt='todo backgroud' className='z-[-1] absolute object-cover h-screen w-screen'/>{props.children}</div>
);

export default Layout;
