import { redirect } from "next/navigation";
import { comments } from "../data";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  // ここを追加
  if (parseInt(params.id) > comments.length || parseInt(params.id) === 0) {
    redirect("/");
  }

  const comment = comments.find(
    (comment) => comment.id === parseInt(params.id)
  );
  return Response.json(comment);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { text } = body;
  const index = comments.findIndex(
    (comment) => comment.id === parseInt(params.id)
  );
  comments[index].text = text;
  return Response.json(comments[index]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const index = comments.findIndex(
    (comment) => comment.id === parseInt(params.id)
  );
  console.log(index);

  const deletedComment = comments[index];
  comments.splice(index, 1);
  return Response.json(deletedComment);
}
