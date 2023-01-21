import React from "react";
import team from "../../../cms/schemas/documents/team";

const Table = () => {
	const teams = [
		{
			name: "Y2 Coding F.C",
			number: 1,
		},
		{
			name: "Y3 Coding F.C",
			number: 2,
		},
		{
			name: "L5 Food Processing F.C",
			number: 3,
		},
		{
			name: "Y2 Coding F.C",
			number: 4,
		},
		{
			name: "Y2 Coding F.C",
			number: 5,
		},
	];

	return (
		<table>
			<thead>
				<th></th>
				<th></th>
				<th>P</th>
				<th>W</th>
				<th>D</th>
				<th>L</th>
				<th>GF</th>
				<th>GA</th>
				<th>GD</th>
				<th>PTS</th>
			</thead>
			<tbody>
				{teams.map((team, index) => (
					<tr key={index}>
						<td>{team.number}</td>
						<td>{team.name}</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
						<td>0</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
