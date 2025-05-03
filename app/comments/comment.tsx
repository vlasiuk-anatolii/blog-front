"use client";

import React, { useEffect, useState } from "react";
import {
	Avatar,
	Box,
	CircularProgress,
	Stack,
	Typography,
} from "@mui/material";
import getMe from "./actions/get-me";
import { CustomError } from "../common/utils/fetch";

export interface User {
	id: number;
	username: string;
	email: string;
	isActive: boolean;
	isVerified: boolean;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
}

interface CommentProps {
	author?: User;
	content: string;
	date: string;
	avatarUrl?: string;
}

export default function Comment({
	content,
	date,
	avatarUrl,
}: CommentProps) {
	const [formattedDate, setFormattedDate] = useState("");
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	useEffect(() => {
		const localDate = new Date(date).toLocaleString("uk-UA", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
		setFormattedDate(localDate);
	}, [date]);

	useEffect(() => {
		getMe().then((value: User | CustomError) => {
			if ("username" in value) {
				setCurrentUser(value);
			}
		});
	}, []);

	if (!formattedDate || !currentUser) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box
			sx={{
				border: 1,
				borderColor: "divider",
				borderRadius: 2,
				p: 2,
				mb: 2,
				mt: 2,
			}}
		>
			<Stack direction="row" spacing={2} alignItems="center">
				<Avatar src={avatarUrl} alt={currentUser?.username}>
					{currentUser?.username.charAt(0).toUpperCase()}
				</Avatar>
				<Box>
					<Typography variant="subtitle2">
						{currentUser?.username}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						{formattedDate}
					</Typography>
				</Box>
			</Stack>
			<Typography sx={{ mt: 1, whiteSpace: "pre-wrap" }}>
				{content}
			</Typography>
		</Box>
	);
}
