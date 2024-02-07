/* eslint-disable react/prop-types */
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import branchImgs from "../../utils/branchImgs";
import "./branchCard.css";
import { Button, TextField } from "@mui/material";

const BranchCard = ({
	branch,
	mode,
	setMode,
	payload,
	setPayload,
	handleTextChange,
	handleSaveBranch,
	handleCancel,
	toggleModal,
	toModify
}) => {
	const handleDeleteClick = () => {
		toModify.current = branch;
		toggleModal();
	};

	const handleEditClick = () => {
		toModify.current = branch;
		setMode("edit");
		setPayload({
			branchName: branch.branchName,
			location: branch.location
		});
	};

	return (
		<div className={"branch-card " + mode}>
			{mode === "create" || mode === "edit" ? (
				<>
					<TextField
						name="branchName"
						variant="standard"
						label="Branch Name"
						onChange={handleTextChange}
						value={payload.branchName ?? ""}
					/>
					<TextField
						name="location"
						variant="standard"
						label="Location"
						onChange={handleTextChange}
						value={payload.location ?? ""}
					/>
					<div className="btn-group">
						<Button onClick={handleCancel}>Cancel</Button>
						<Button
							disabled={!payload.branchName && !payload.location}
							onClick={handleSaveBranch}
						>
							Save
						</Button>
					</div>
				</>
			) : (
				<>
					<div className="img-cont">
						<img
							src={
								branchImgs.find((img) => img.location === branch.location)
									?.img ??
								branchImgs.find((img) => img.location === "Unregistered").img
							}
							alt={branch.location}
						/>
					</div>
					<div>
						<h3>{branch.branchName}</h3>
						<span className="funcs">
							<span onClick={handleEditClick}>
								<FaPencilAlt />
							</span>
							<span onClick={handleDeleteClick}>
								<RiDeleteBin6Line />
							</span>
						</span>
					</div>
					<span className="location">{branch.location}</span>
				</>
			)}
		</div>
	);
};

export default BranchCard;
