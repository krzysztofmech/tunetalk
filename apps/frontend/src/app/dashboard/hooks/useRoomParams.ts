import { useParams } from "next/navigation"

export const useRoomParams = () => {
    const params = useParams < { id: string }>();
    return params;
}
