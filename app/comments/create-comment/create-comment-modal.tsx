import {
	Box,
	Button,
	Modal,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { usePosts } from "../../store/usePosts";
import { useParams } from "next/navigation";

const styles = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

interface CreateCommentModalProps {
	open: boolean;
	onClose: () => void;
}

export default function CreateCommentModal({
	open,
	onClose,
}: CreateCommentModalProps) {
	const [content, setContent] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");
	const [error, setError] = useState<{
		content?: string;
		avatarUrl?: string;
	} | null>(null);

	const { commentOnPost, loadComments } = usePosts();
	const { postId: postIdParam } = useParams();
	const postId = Number(postIdParam);

	if (isNaN(postId)) {
		console.error("Invalid postId:", postIdParam);
		return null;
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		if (!content) {
			setError({
				...(content ? {} : { content: "Content is required" }),
			});
			return;
		}

		try {
			await commentOnPost({ postId, content, avatarUrl });
			await loadComments({ postId });
			handleClose();
		} catch (err: unknown) {
			setError({
				avatarUrl:
					(err as { message?: string })?.message ||
					"Error creating comment",
			});
		}
	};

	const handleClose = () => {
		setContent("");
		setAvatarUrl("");
		setError(null);
		onClose();
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={styles}>
				<form onSubmit={handleSubmit} className="w-full max-w-xs">
					<Stack spacing={2}>
						<Typography variant="h5">Add comment</Typography>
						<TextField
							name="content"
							label="Content"
							variant="outlined"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							helperText={error?.content}
							error={!!error?.content}
						/>
						<TextField
							name="avatarUrl"
							label="AvatarUrl"
							variant="outlined"
							value={avatarUrl}
							onChange={(e) => setAvatarUrl(e.target.value)}
							helperText={error?.avatarUrl}
							error={!!error?.avatarUrl}
						/>
						<Button type="submit" variant="contained">
							Submit
						</Button>
					</Stack>
				</form>
			</Box>
		</Modal>
	);
}
