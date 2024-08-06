import TicTacToe from './components/TicTacToe';

export default function page() {
  return (
    <div className='w-screen flex justify-center items-center'>
      {/* <h1 className='mb-4 text-blue-300'>Tic Tac Toe</h1> */}
      <TicTacToe />
    </div>
  );
}
