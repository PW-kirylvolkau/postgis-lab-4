using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class Final : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_routes_routes_NextId",
                schema: "public",
                table: "routes");

            migrationBuilder.DropIndex(
                name: "IX_routes_NextId",
                schema: "public",
                table: "routes");

            migrationBuilder.DropColumn(
                name: "NextId",
                schema: "public",
                table: "routes");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                schema: "public",
                table: "vehicles",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<double>(
                name: "DeliveryLat",
                schema: "public",
                table: "orders",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DeliveryLng",
                schema: "public",
                table: "orders",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PickupLat",
                schema: "public",
                table: "orders",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PickupLng",
                schema: "public",
                table: "orders",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryLat",
                schema: "public",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "DeliveryLng",
                schema: "public",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "PickupLat",
                schema: "public",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "PickupLng",
                schema: "public",
                table: "orders");

            migrationBuilder.AlterColumn<int>(
                name: "Name",
                schema: "public",
                table: "vehicles",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "NextId",
                schema: "public",
                table: "routes",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_routes_NextId",
                schema: "public",
                table: "routes",
                column: "NextId");

            migrationBuilder.AddForeignKey(
                name: "FK_routes_routes_NextId",
                schema: "public",
                table: "routes",
                column: "NextId",
                principalSchema: "public",
                principalTable: "routes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
