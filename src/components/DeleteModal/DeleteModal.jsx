/* eslint-disable react/prop-types */
import { Button, Dialog } from "@mui/material";
import fetchClient from "../../utils/fetch";
import "./deleteModal.css";

const DeleteModal = ({ type, open, toDelete, toggleDialog }) => {
	const handleDelete = () => {
		fetchClient()
			.delete(`/${type === "branch" ? "branches" : "products"}/${toDelete._id}`)
			.then(() =>
				type === "product" ? toggleDialog("delete") : toggleDialog()
			)
			.catch((err) => console.log(err));
	};

	return (
		<Dialog className="delete-modal" open={open}>
			<h2>Delete {type === "branch" ? "Branch" : "Product"}</h2>
			<span>
				Are you sure you want to delete this{" "}
				{type === "branch" ? "branch" : "product"}?
			</span>
			<div className="btn-group">
				<Button
					onClick={() =>
						type === "product" ? toggleDialog("delete") : toggleDialog()
					}
				>
					Cancel
				</Button>
				<Button onClick={handleDelete}>Accept</Button>
			</div>
		</Dialog>
	);
};

export default DeleteModal;
