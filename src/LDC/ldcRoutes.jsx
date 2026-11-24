import { Routes, Route, Navigate } from "react-router-dom";
import LdcLayout from "./LdcLayout";
import Classement from "./Classement";
import Matchs from "./Matchs";
import MonClub from "./MonClub";
import Billetterie from "./Billetterie";
import ClubDetail from "../ClubDetail/ClubDetail";


export default function LdcRoutes() {
  return (
    <Routes>
      <Route element={<LdcLayout />}>
        <Route index element={<Navigate to="/ldc/classement" replace />} />
        <Route path="classement" element={<Classement />} />
        <Route path="matchs" element={<Matchs />} />
        <Route path="mon-club" element={<MonClub />} />
        <Route path="billetterie" element={<Billetterie />} />
        <Route path="club/:clubId" element={<ClubDetail />} />
      </Route>
    </Routes>
  );
}