"use client";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
const Home: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();
  if(!isAuthenticated) {
      router.push("/login");
  }else{
    router.push("/dashboard");
  }
  return null;
}
export default Home;