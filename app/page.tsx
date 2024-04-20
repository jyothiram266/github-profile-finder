"use client"

import Image from "next/image";
import DarkandLightButron from "./components/DarkandLightButron";
import SearchandBtn from "./components/SearchandBtn";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { IoLink } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { FaBuilding } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import dateFormat from "dateformat";


type GitHubUser = {
  avatar_url: string;
  bio: string;
  blog: string;
  company: null | string;
  created_at: string;
  email: null | string;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: null | string;
  type: string;
  updated_at: string;
  url: string;
  documentation_url: string;
  message: string;
};


export default function Home() {
  const [userName, setUserName] = useState("octocat");

  const { isPending, error, data ,refetch } = useQuery<GitHubUser>({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`https://api.github.com/users/${userName}`).then((res) =>
        res.json(),
      ),
  })
  
  if (isPending)
    return (
      <div className="flex h-screen w-full items-center justify-center dark:bg-slate-800 bg-white">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    refetch();
  }

  return (
    <div className="flex min-h-screen w-full bg-stone-100 p-1.5 sm:p-4 pt-10 sm:12 transition-all dark:bg-slate-900">
      <div className="mx-auto flex w-full max-w-[600px] flex-col gap-8 rounded p-2">
        <section className="flex justify-between gap-3">
          <p className="text-xl font-semibold">GithubFinder</p>
          <DarkandLightButron />
        </section>

        <section className="flex flex-col gap-6">
          <SearchandBtn value={userName} onChange={(e)=>setUserName(e.target.value)} onSubmit={handleSubmit} />
          <main className="flex w-full flex-col gap-5 rounded-lg bg-white dark:bg-slate-800 px-4 py-8 min-h-[200px]">
            <section className="flex gap-4">
              <Image
                width={200}
                height={200}
                className="h-20 w-20 rounded-full"
                src={data?.avatar_url ?? 
                  "https://avatars.githubusercontent.com/u/158404377?s=200&v=4"
                }
                alt="user-img"
              />
              <section className="flex flex-col justify-between gap-1 transition-all sm:w-full sm:flex-row">
                <div>
                  <h1>{data?.name}</h1>
                  <Link
                    target = "_blank"
                    className="text-blue-500 hover:underline text-sm transition-all"
                    href={`https://www.github.com/${data?.login}/`}
                  >
                    @{data?.login}
                  </Link>
                </div>
                <p>
                  <span>Joined </span>
                  <span>{dateFormat(data?.created_at,`dd mmm yyyy`)}</span>
                </p>
              </section>
            </section>
            <section className="flex flex-col gap-5">
              <p>
                {data?.bio ?? (
                  <span className="opacity-60">This User Has No Bio 🚫</span>
                )}
              </p>
              <div className="flex justify-between gap-3 rounded-lg bg-stone-100 px-6 py-4 dark:bg-slate-900 min-h-[50px]">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs opacity-60">Repos</p>
                  <p className="text-sm font-bold sm:text-base">{data?.public_repos}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs opacity-60">Followers</p>
                  <p className="text-sm font-bold sm:text-base">{data?.followers}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs opacity-60">Following</p>
                  <p className="text-sm font-bold sm:text-base">{data?.following}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex gap-2 items-center">
                  <CiLocationOn  className="text-xl"/>
                  <p>{data?.location ?? (<span className="opacity-60">Not Available</span>)}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <IoLink className="text-xl"/>
                  {data?.blog ? (
                      <Link
                        title={data?.blog}
                        className="hover:underline opacity-60 max-w-[220px] overflow-hidden text-ellipsis "
                        href={data?.blog ?? "#"}
                      >
                        {data?.blog}{" "}
                      </Link>
                    ) : (
                      <span className="opacity-60">Not Available</span>
                    )}{" "}
                </div>
                <div className="flex gap-2 items-center">
                  <BsTwitterX/>
                  <p>{data?.twitter_username ?? (
                  <span className="opacity-60">Not Available</span> 
                  )}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <FaBuilding  className="text-xl"/>
                  <p>
                      {data?.company ?? (
                        <span className="opacity-60">Not Available</span>
                      )}
                    </p>
                </div>
              </div>
            </section>
          </main>
        </section>
      </div>
    </div>
  );
}
