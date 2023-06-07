type Props = { onClick: () => void };

const Completion = ({ onClick }: Props) => {
	return (
		<div className="flex z-50 absolute left-0 right-0 top-0 bottom-0 items-center justify-center bg-slate-900/80">
			<div className="bg-white p-4 rounded-lg flex flex-col items-center ">
				<div>Congratulation You Have Solved The Puzzle </div>
				<div>Continue With New Words </div>
				<p>
					The code for grid generation is inspired from{" "}
					<a
						className="underline font-bold"
						href="https://github.com/bunkat/wordfind"
						target="_blank">
						Here
					</a>
				</p>
				<button
					onClick={onClick}
					className="bg-slate-700 px-4 py-2 mt-4 rounded-lg text-white hover:bg-slate-700/80">
					New Puzzle
				</button>
			</div>
		</div>
	);
};

export default Completion;
