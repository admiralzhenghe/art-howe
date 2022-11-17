export default function generateMosaicData(thumbnail, medium) {
  // Place post data, thumbnail URL and medium image URL into a single object
  // Skip search results that are not "Posts"
  return thumbnail.posts.nodes.reduce((arr, post, idx) => {
    if (post.featuredImage?.node.sourceUrl) {
      arr.push({
        post,
        thumbnail: post.featuredImage.node.sourceUrl,
        medium: medium.posts.nodes[idx].featuredImage.node.sourceUrl,
      });
    }
    return arr;
  }, []);
}
