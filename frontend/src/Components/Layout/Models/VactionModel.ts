import { ReactNode } from "react";

export interface VacationModel {
    totalLikes: number;
    myLike?: number | boolean;
    vacationId: number;
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    image: string;
    imageUrl?: string;
    editImageFile?: FileList | null;

}