import { DataGrid } from "@mui/x-data-grid";
import { getInventoryColumns } from "../../utils/getColumns";
import { useEffect, useRef, useState } from "react";
import fetchClient from "../../utils/fetch";
import "./inventory.css";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import ProductModal from "../../components/ProductModal/ProductModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

const Inventory = () => {
	const mode = useRef("");
	const toModify = useRef(null);
	const [data, setData] = useState({
		branches: [],
		products: []
	});
	const [paginationModel, setPaginationModel] = useState({
		pageSize: 10,
		page: 0
	});
	const [isOpen, setIsOpen] = useState({
		product: false,
		delete: false
	});

	useEffect(() => {
		axios
			.all([fetchClient().get("/branches"), fetchClient().get("/products")])
			.then(
				axios.spread((branches, products) => {
					setData({
						branches: branches.data,
						products: products.data
					});
				})
			)
			.catch((err) => console.log(err));
	}, [isOpen]);

	const toggleDialog = (type) =>
		setIsOpen({ ...isOpen, [type]: !isOpen[type] });

	const handleModifyProduct = (type, dialogType, item = null) => {
		mode.current = type;
		toggleDialog(dialogType);
		if (item) toModify.current = item;
	};

	return (
		<div className="inventory">
			<div className="functions">
				<TextField label="Search" variant="standard" />
				<Button
					onClick={() => handleModifyProduct("create")}
					variant="outlined"
				>
					+ Add Product
				</Button>
			</div>
			<DataGrid
				getRowId={(row) => row._id}
				columns={getInventoryColumns(data.branches, handleModifyProduct)}
				rows={data.products}
				getRowHeight={() => "auto"}
				pageSizeOptions={[5, 10, 15]}
				paginationModel={paginationModel}
				onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
				disableColumnMenu
				disableRowSelectionOnClick
			/>
			{isOpen.product && (
				<ProductModal
					mode={mode.current}
					toEdit={toModify.current}
					branches={data.branches}
					toggleDialog={toggleDialog}
					open={isOpen.product}
				/>
			)}
			{isOpen.delete && (
				<DeleteModal
					toDelete={toModify.current}
					open={isOpen.delete}
					type="product"
					toggleDialog={toggleDialog}
				/>
			)}
		</div>
	);
};

export default Inventory;
