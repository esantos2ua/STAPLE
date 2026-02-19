import { vi, describe, it, expect } from "vitest"
import { render, screen } from "test/utils"
import ProjectsList from "./ProjectsList"
import { usePaginatedQuery } from "@blitzjs/rpc"

// Mock usePaginatedQuery
vi.mock("@blitzjs/rpc", async () => {
  const actual = await vi.importActual<typeof import("@blitzjs/rpc")>("@blitzjs/rpc")
  return {
    ...actual,
    usePaginatedQuery: vi.fn(),
  }
})

// Mock useRouter
vi.mock("next/router", () => ({
  __esModule: true,
  default: {
    query: { page: "0" },
    push: vi.fn(),
    pathname: "/projects",
  },
  useRouter: () => ({
    query: { page: "0" },
    push: vi.fn(),
    pathname: "/projects",
  }),
}))

// Mock useCurrentUser
vi.mock("src/users/hooks/useCurrentUser", () => ({
  useCurrentUser: () => ({ id: 1, name: "Test User" }),
}))

// Mock ProjectCard
vi.mock("./ProjectCard", () => ({
  default: ({ project }) => <div>ProjectCard: {project.name}</div>,
}))

describe("ProjectsList", () => {
  it("renders a list of projects", () => {
    const mockProjects = [
      { id: 1, name: "Project A" },
      { id: 2, name: "Project B" },
    ]

    ;(usePaginatedQuery as any).mockReturnValue([{ projects: mockProjects, hasMore: false }])

    render(<ProjectsList searchTerm="" />)

    expect(screen.getByText("ProjectCard: Project A")).toBeInTheDocument()
    expect(screen.getByText("ProjectCard: Project B")).toBeInTheDocument()
  })

  it("renders empty state", () => {
     ;(usePaginatedQuery as any).mockReturnValue([{ projects: [], hasMore: false }])

     render(<ProjectsList searchTerm="" />)

     expect(screen.queryByText(/ProjectCard/)).not.toBeInTheDocument()
  })
})
