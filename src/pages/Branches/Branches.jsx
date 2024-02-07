import { Button } from "@mui/material";
import BranchCard from "../../components/BranchCard/BranchCard";
import { useEffect, useRef, useState } from "react";
import fetchClient from "../../utils/fetch";
import "./branches.css";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

const Branches = () => {
	const toModify = useRef(null);
	const [branches, setBranches] = useState([]);
	const [mode, setMode] = useState("readonly");
	const [payload, setPayload] = useState({});
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const getData = setTimeout(() => fetchBranches(), 250);
		return () => clearTimeout(getData);
	}, [isOpen]);

	const fetchBranches = () =>
		fetchClient()
			.get("/branches")
			.then((res) => setBranches(res.data))
			.catch((err) => console.log(err));

	const addBranch = () => {
		setMode("create");
		setBranches(
			branches.concat({
				_id: 0,
				branchName: "",
				location: ""
			})
		);
	};

	const handleTextChange = (e) =>
		setPayload({ ...payload, [e.target.name]: e.target.value });

	const handleSaveBranch = () =>
		(mode === "create"
			? fetchClient().post("/branches", payload)
			: fetchClient().put(`/branches/${toModify.current._id}`, payload)
		)
			.then(() => {
				fetchBranches();
				setMode("readonly");
				setPayload({});
			})
			.catch((err) => console.log(err));

	const handleCancel = () => {
		if (mode === "create")
			setBranches(
				branches.filter((branch, idx) => idx !== branches.length - 1)
			);
		setMode("readonly");
	};

	const toggleModal = () => setIsOpen(!isOpen);

	return (
		<div className="branches">
			<Button onClick={addBranch}>+ Add Branch</Button>
			<div className="branch-cards">
				{branches.map((branch, idx) => (
					<BranchCard
						handleTextChange={handleTextChange}
						handleSaveBranch={handleSaveBranch}
						handleCancel={handleCancel}
						toggleModal={toggleModal}
						setMode={setMode}
						setPayload={setPayload}
						toModify={toModify}
						payload={payload}
						mode={
							idx === branches.length - 1 && mode === "create"
								? "create"
								: branch._id === toModify.current?._id && mode === "edit"
								? "edit"
								: "readonly"
						}
						key={branch._id}
						branch={branch}
					/>
				))}
			</div>
			{isOpen && (
				<DeleteModal
					open={isOpen}
					type="branch"
					toDelete={toModify.current}
					toggleDialog={toggleModal}
				/>
			)}
		</div>
	);
};

export default Branches;
