#!/usr/bin/env bash


kubectl delete service auto
kubectl delete service airline
kubectl delete service hotel
kubectl delete service agent
kubectl delete service users

kubectl delete deployment auto
kubectl delete deployment airline
kubectl delete deployment hotel
kubectl delete deployment agent
kubectl delete deployment users
