import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Trash2Icon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
interface DeleteActionProps {
  id: string;
  mutationFn: (id: string) => Promise<any>;
  queryKey: string[];
  navigateTo?: string;
  type?: "softDelete" | "hardDelete";
}

export const DeleteAction: React.FC<DeleteActionProps> = (props) => {
  const [confirmed, setConfirmed] = React.useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id, mutationFn, queryKey, navigateTo } = props;

  const { mutate, isPending } = useMutation({
    mutationFn: () => mutationFn(id),
    onSuccess: () => {
      toast.success("Item deleted successfully");
      navigateTo && navigate({ to: navigateTo });
      setConfirmed(false);
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      toast.error("Error deleting item");
      console.error("Error deleting item:", error);
    },
  });

  return (
    <AlertDialog open={confirmed} onOpenChange={setConfirmed}>
      <AlertDialogTrigger asChild>
        <div className="flex justify-between w-full cursor-pointer text-sm px-2 hover:bg-red-500 hover:text-white py-1 rounded-md">
          <div>Delete</div>
          <Trash2Icon size={16} strokeWidth={1} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure? </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate()} disabled={isPending}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
