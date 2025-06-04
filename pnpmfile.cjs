module.exports = {
  hooks: {
    readPackage(pkg) {
      // 忽略特定的peerDependency警告
      if (pkg.name === 'zod-prisma') {
        delete pkg.peerDependencies.prisma
      }
    }
  }
}
