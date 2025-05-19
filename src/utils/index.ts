
/**
 * Creates a URL for a page based on the page name
 * @param pageName The name of the page
 * @returns The URL for the page
 */
export function createPageUrl(pageName: string): string {
  switch(pageName) {
    case "Home":
      return "/";
    case "Membros":
      return "/equipe";
    case "Projetos":
      return "/projetos";
    case "Noticias":
      return "/noticias";
    case "Contato":
      return "/contato";
    default:
      return "/";
  }
}
