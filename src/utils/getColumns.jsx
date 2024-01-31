import ActionCell from "../components/ActionCell/ActionCell";

export const getInventoryColumns = (branches, handleModifyProduct) =>
	[
		{
			field: "productName",
			headerName: "Product",
			minWidth: 120,
			flex: 1
		},
		{
			field: "description",
			headerName: "Description",
			minWidth: 380,
			flex: 1
		},
		{
			field: "price",
			headerName: "Price",
			minWidth: 60,
			flex: 1,
			valueFormatter: (params) => (!params.value ? "" : "ʛ" + params.value)
		},
		{
			field: "totalCount",
			headerName: "Total",
			minWidth: 60,
			flex: 1
		}
	].concat(
		branches.map((item, idx) => ({
			field: "branch" + (idx + 1),
			headerName: item.branchName,
			valueGetter: (params) =>
				params.row.distribution.find((branch) => branch.branchId === item._id)
					.count,
			minWidth: 210,
			flex: 1
		})),
		[
			{
				field: "undistributed",
				headerName: "Undistributed",
				minWidth: 120,
				flex: 1
			},
			{
				field: "actions",
				headerName: "Actions",
				minWidth: 80,
				sortable: false,
				flex: 1,
				renderCell: (params) => (
					<ActionCell handleModifyProduct={handleModifyProduct} {...params} />
				)
			}
		]
	);

export const getBranchesColumn = () => [
	{
		field: "branchName",
		headerName: "Branch Name",
		minWidth: 120,
		flex: 1
	},
	{
		field: "location",
		headerName: "Location",
		minWidth: 120,
		flex: 1
	},
	{
		field: "actions",
		headerName: "Actions",
		minWidth: 80,
		sortable: false,
		flex: 1
	}
];
