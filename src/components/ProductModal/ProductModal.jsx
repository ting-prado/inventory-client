/* eslint-disable react/prop-types */
import { Button, Dialog, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import fetchClient from "../../utils/fetch";
import "./productModal.css";

const ProductModal = ({ open, toggleDialog, branches, mode, toEdit }) => {
	const isSubmitted = useRef(false);
	const [errors, setErrors] = useState({});
	const [payload, setPayload] = useState({
		distribution: []
	});

	useEffect(() => {
		if (mode === "edit") {
			const { productName, price, description, distribution } = toEdit;
			setPayload({ ...payload, productName, price, description, distribution });
		}
	}, []);

	useEffect(() => {
		if (!Object.keys(errors).length && isSubmitted.current) submitRequest();
	}, [errors]);

	const handleTextChange = (e) =>
		setPayload({ ...payload, [e.target.name]: e.target.value });

	const handleDistChange = (e, id) => {
		const doesExist = payload.distribution.find((item) => item.branchId === id);
		if (doesExist)
			setPayload({
				...payload,
				distribution: payload.distribution.map((item) =>
					item.branchId === id
						? { ...item, count: e.target.value ? Number(e.target.value) : 0 }
						: item
				)
			});
		else
			setPayload({
				...payload,
				distribution: payload.distribution.concat({
					branchId: id,
					count: e.target.value ? Number(e.target.value) : 0
				})
			});
	};

	const validate = () => {
		const obj = {};
		const { productName, description, price } = payload;

		if (!productName) obj.productName = true;
		if (!price) obj.price = true;
		if (!description) obj.description = true;

		return obj;
	};

	const handleSubmit = () => {
		isSubmitted.current = true;
		setErrors(validate());
	};

	const handleCancel = () => toggleDialog("product");

	const submitRequest = () =>
		(mode === "create"
			? fetchClient().post("/products", payload)
			: fetchClient().put(`/products/${toEdit._id}`, payload)
		)
			.then(() => toggleDialog("product"))
			.catch((err) => console.log(err));

	return (
		<Dialog open={open} className="product-modal">
			<h1>{mode === "create" ? "Add a new product" : "Edit Product"}</h1>
			<div className="main">
				<h3 className="info">Basic Information:</h3>
				<div className="info">
					<TextField
						name="productName"
						variant="standard"
						label="Product Name"
						onChange={handleTextChange}
						value={payload.productName ?? ""}
					/>
					<TextField
						name="price"
						variant="standard"
						label="Price"
						onChange={handleTextChange}
						value={payload.price ?? ""}
					/>
					<TextField
						name="description"
						label="Description"
						onChange={handleTextChange}
						value={payload.description ?? ""}
						multiline
						minRows={3}
						maxRows={6}
					/>
				</div>
				<h3 className="distribution">Distribution:</h3>
				<div className="distribution">
					{branches.map((branch) => (
						<div key={branch._id}>
							<span>{branch.branchName}:</span>
							<TextField
								name="count"
								variant="standard"
								label="Amount"
								onChange={(e) => handleDistChange(e, branch._id)}
								value={
									payload.distribution.find(
										(item) => branch._id === item.branchId
									)?.count ?? 0
								}
							/>
						</div>
					))}
				</div>
			</div>
			<div className="btn-group">
				<Button variant="outlined" onClick={handleCancel}>
					Cancel
				</Button>
				<Button variant="contained" onClick={handleSubmit}>
					Save
				</Button>
			</div>
		</Dialog>
	);
};

export default ProductModal;
