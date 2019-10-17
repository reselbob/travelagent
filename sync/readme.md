# Setting Up the Synchronous Version of the Travel Agent MOA to Run Under Minikube

## (MOA = Microservices Oriented Architecture)

View the architecture diagram [here](architecture.md).

---- 

Before you start, please be advised that the MOA is running inside a Kubernetes cluster. The current state of the code is that the microservices are running
internal to Kubernetes. Hence, the application is facilitating internal "travel" behavior.
---- 

**Step 1**: Go to a Minikube playground on Katacoda

(You might have to login or create an account)

`https://katacoda.com/javajon/courses/kubernetes-fundamentals/minikube`

**Step 2**: Load in this source code

`git clone https://github.com/reselbob/travelagent.git`

**Step 3**: Navigate to the synchronous version of the MOA

`cd travelagent/sync/`

**Step 4**: Run the shell script the creates a local Docker registry and seed the registry
with the containers representing each microservice 

`sh docker-seed.sh`

**Step 5**: Add your `mLab` authentication data to Kubernetes secret manifest,
 `travelagent/sync/kubernetes/manifests/travelagent-secret.yaml`;

**Step 6**: Install the Kubernetes artifacts

`sh kubernetes/generate-k8s-resources.sh`
