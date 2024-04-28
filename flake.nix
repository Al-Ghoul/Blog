{
  description = "A flake for a personal blog project";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    devenv.url = "github:cachix/devenv";
  };

  nixConfig = {
    extra-trusted-public-keys =
      "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = { nixpkgs, devenv, ... }@inputs:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in
    {

      devShells."${system}".default = devenv.lib.mkShell {
        inherit inputs pkgs;

        modules = [
          (_: {

            packages = with pkgs; [ nodejs_20 yarn cz-cli ];

            pre-commit.hooks = {
              deadnix.enable = true;
              nixpkgs-fmt.enable = true;
              denofmt.enable = true;
              denolint.enable = true;
            };

          })

        ];

      };

    };
}
