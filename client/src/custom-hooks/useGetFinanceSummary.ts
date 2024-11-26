import { ErrorResponse } from "@/@types/Error";
import { FinanceSummary } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import {
  resetFinanceSummary,
  setFinanceSummary,
} from "@/features/analytics/analyticSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GetFinanceSummary {
  statusCode: number;
  data: FinanceSummary;
  message: string;
  success: boolean;
}

const useGetFinanceSummary = () => {
  const dispatch = useAppDispatch();

  return useQuery<GetFinanceSummary, ErrorResponse>({
    queryKey: ["financeSummary"],
    queryFn: async () => {
      try {
        const response = await api.get("/analytics/get-finance-summary");
        const data = response.data.data;
        dispatch(setFinanceSummary(data));
        return data;
      } catch (error) {
        dispatch(resetFinanceSummary());
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message || "An unexpected error occurred.";
          console.error(errorMessage);
        }

        throw error;
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export default useGetFinanceSummary;

// {
//   $project: {
//     _id: 0,
//     currentYearBalance: {
//       $map: {
//         input: Array.from({ length: 12 }, (_, i) => i + 1),
//         as: "month",
//         in: {
//           month: "$$month",
//           totalBalance: {
//             $let: {
//               vars: {
//                 match: {
//                   $arrayElemAt: [
//                     {
//                       $filter: {
//                         input: "$currentYearBalance",
//                         cond: { $eq: ["$$this.month", "$$month"] },
//                       },
//                     },
//                     0,
//                   ],
//                 },
//               },
//               in: { $ifNull: ["$$match.totalBalance", 0] },
//             },
//           },
//         },
//       },
//     },
//   },
// },

//  -_________________________________________$$$$

// _id: 0,
// monthlyFlow: {
//   $map: {
//     input: Array.from({ length: 12 }, (_, i) => i + 1),
//     as: "month",
//     in: {
//       month: "$$month",
//       monthlyFlow: {
//         $let: {
//           vars: {
//             match: {
//               $arrayElemAt: [
//                 {
//                   $filter: {
//                     input: "$monthlyFlow",
//                     cond: { $eq: ["$$this.month", "$$month"] },
//                   },
//                 },
//                 0,
//               ],
//             },
//           },
//           in: { $ifNull: ["$$match", { income: 0, expense: 0 }, 0] },
//         },
//       },
//     },
//   },
// },
