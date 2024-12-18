# Build docker image
[group('ci')]
docker-build extra-args='--iidfile /tmp/image-id':
    #!/usr/bin/bash
    set -Eeuxo pipefail

    docker buildx build \
    --build-arg SOURCE_DATE_EPOCH=$(git log -1 --pretty=%ct) \
    --platform linux/amd64,linux/arm64 \
    --output type=image,rewrite-timestamp=true,name=target,annotation-index.org.opencontainers.image.revision=$(git rev-parse HEAD) \
    --provenance false \
    --progress plain \
    {{ extra-args }} \
    .
